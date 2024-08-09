import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/firebase-auth.middleware';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: "./configs/private-key.json" // Đường dẫn đến file firebase-admin-key.json
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cqqugbtsvqrc73fntor0-a.singapore-postgres.render.com',
      port: 5432,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      username: 'huy',
      password: 'zHb1wWoTyegO10trfVeDsz9aq8tZmKM5',
      database: 'dare',
      synchronize: true,
      ssl: { rejectUnauthorized: false },

    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*'); // Áp dụng middleware cho tất cả các route, bạn có thể tùy chỉnh theo nhu cầu
  }
}
