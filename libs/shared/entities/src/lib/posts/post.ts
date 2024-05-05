export abstract class Post {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
