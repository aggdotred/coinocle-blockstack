class Blog {
  constructor({
    id,
    title,
    blogIntro,
    coins,
    body,
    imageUrl,
    authorId,
    authorImageUrl,
    updatedAt,
    tags,
  }){
    this.id = id;
    this.title = title;
    this.blogIntro = blogIntro;
    this.coins = coins;
    this.body = body;
    this.imageUrl = imageUrl;
    this.authorId = authorId;
    this.authorImageUrl = authorImageUrl;

    this.createdAt = `${new Date()}`;
    this.updatedAt = updatedAt ? updatedAt : this.createdAt;

    this.comments = {};
    this.likes = {};
    this.tags = tags;
  }
}

export default Blog;
