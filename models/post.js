const Post = sequelize.define('post', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT
});
const Comment = sequelize.define('comment', {
  content: Sequelize.TEXT,
  postId: Sequelize.INTEGER
});

Post.belongsTo(Comment);
Comment.belongsTo(Post);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

module.exports = {
  Post,
  Comment
};

}












