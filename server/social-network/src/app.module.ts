import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/firebase-auth.middleware';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { StorageModule } from './storage/storage.module';
import { SearchModule } from './search/search.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: './configs/private-key.json', // Đường dẫn đến file firebase-admin-key.json
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      username: 'postgres.rndigiehwzwulnceicof',
      password: 'Thanhhuy2002@',
      database: 'postgres',
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),

    AuthModule,

    ProfileModule,

    PostModule,

    StorageModule,

    SearchModule,

    LikeModule,

    CommentModule,

    FriendshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Áp dụng middleware cho tất cả các route, bạn có thể tùy chỉnh theo nhu cầu
  }
}
