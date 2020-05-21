// import React, {useState} from 'react';

// const BlogContextUseState = React.createContext();

// export const BlogProvider = ({children}) => {
//   const [blogPosts, setBlogPosts] = useState([]);

//   const addBlogPost = () => {
//     setBlogPosts([...blogPosts, {title: `Blog Post #${blogPosts.length + 1}`}]);
//   };

//   return (
//     <BlogContextUseState.Provider value={{data: blogPosts, addBlogPost}}>
//       {children}
//     </BlogContextUseState.Provider>
//   );
// };

// export default BlogContextUseState;
