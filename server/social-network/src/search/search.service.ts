import { Injectable } from '@nestjs/common';

import { IdgenService } from '../utils/idgen/idgen.service';
import { Client } from '@elastic/elasticsearch';
import { Profile } from '../profile/entities/profile.entity';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class SearchService {
  private readonly esClient: Client;

  constructor(private idgenService: IdgenService) {
    this.esClient = new Client({
      node: 'https://es.ext.akademy.dev/',
      // auth: {
      //   apiKey: "N3VYTFpKRUJ2a19OYWhpZV9CZDM6REFnTHVZZk9Scm1hTEsxU2loY3lxUQ==",
      //   username: "elastic",
      //   password: "CGSqEgB730tMblc7lXZBwSI9"
      // }
    });

    console.log('esClient', this.esClient);
  }

  async indexProfile(profile: Profile) {
    await this.esClient.index({
      index: 'dare_profiles',
      id: profile.uid,
      document: {
        uid: profile.uid,
        username: profile.userName,
        email: profile.email,
      },
    });
  }

  async searchProfiles(query: string) {
    // search for profiles by username or email or uid
    const response = await this.esClient.search({
      index: 'dare_profiles',
      query: {
        multi_match: {
          query: query,
          fields: ['username', 'email', 'uid'],
        },
      },
    });
    return response.hits.hits;
  }

  async indexPost(post: Post) {
    // get all hashtags in the post's content
    const hashtags = post.content.match(/#\w+/g) || [];
    // lowercase all hashtags
    const lowercasedHashtags = hashtags.map((tag) => tag.toLowerCase());
    // remove duplicates
    const uniqueHashtags = Array.from(new Set(lowercasedHashtags));
    // index
    for (let tag of uniqueHashtags) {
      await this.esClient.index({
        index: 'dare_hashtags',
        id: this.idgenService.generateId(),
        document: {
          id: post.id,
          uid: post.uid,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          hashtag: tag,
        },
      });
    }

    await this.esClient.index({
      index: 'dare_posts',
      id: post.id.toString(),
      document: {
        id: post.id,
        uid: post.uid,
        content: post.content,
        title: post.title,
        createdAt: post.createdAt,
        imageUrls: post.imageUrls,
      },
    });
  }

  async updatePost(post: Post) {
    // delete first
    await this.deletePost(post.id);
    // index
    await this.indexPost(post);
  }

  async searchPosts(query: string) {
    const response = await this.esClient.search({
      index: 'dare_posts',
      query: {
        multi_match: {
          query: query,
          fields: ['*'],
        },
      },
    });
    return response.hits.hits;
  }

  async searchHashtags(query: string) {
    const response = await this.esClient.search({
      index: 'dare_hashtags',
      query: {
        match: {
          hashtag: query,
        },
      },
    });
    return response.hits.hits;
  }

  async deletePost(postId: number) {
    // delete post from hashtags index
    // get post first
    const post = await this.esClient.get({
      index: 'dare_posts',
      id: postId.toString(),
    });
    // get all hashtags in the post's content
    const hashtags = (post._source as any).content.match(/#\w+/g) || [];
    // lowercase all hashtags
    const lowercasedHashtags = hashtags.map((tag) => tag.toLowerCase());
    // remove duplicates
    const uniqueHashtags = Array.from(new Set(lowercasedHashtags));

    for (let tag of uniqueHashtags) {
      await this.esClient.deleteByQuery({
        index: 'dare_hashtags',
        query: {
          match: {
            id: postId,
            hashtag: tag.toString(),
          },
        },
      });
    }

    await this.esClient.delete({
      index: 'dare_posts',
      id: postId.toString(),
    });
  }

  async searchAny(indexName: string, query: string) {
    try {
      const response = await this.esClient.search({
        index: [indexName],
        query: {
          multi_match: {
            query: query,
            fields: ['*'],
          },
        },
      });
      return response.hits.hits.map((hit) => hit['_source']);
    } catch (e) {
      return [];
    }
  }

  async getAllIndexPosts() {
    const response = await this.esClient.search({
      index: 'dare_posts',
      query: {
        match_all: {},
      },
    });
    return response.hits.hits.map((hit) => hit._source);
  }

  async deleteIndexPost(postId: number) {
    await this.esClient.delete({
      index: 'dare_posts',
      id: postId.toString(),
    });
  }
}
