const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((max, current) => {
    return current.likes > max.likes ? current : max;
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(authorCounts).reduce(
    (max, [author, count]) =>
      count > max.blogs ? { author, blogs: count } : max,
    { author: null, blogs: 0 }
  );
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesPerAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  return Object.entries(likesPerAuthor).reduce(
    (max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
    { author: null, likes: 0 }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
