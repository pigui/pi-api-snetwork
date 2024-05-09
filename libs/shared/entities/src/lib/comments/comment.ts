export abstract class Comment {
  constructor(
    public id: string,
    public content: string,
    public userId: string,
    public postId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
