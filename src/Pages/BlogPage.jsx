import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { baseUrl } from '../baseUrl';

const BlogPage = () => {

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/"
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const {loading, setLoading} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        console.log("URL is: ");
        console.log(url);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error) {
            console.log("Error in the fuction call related to Blog Id");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname] )

  return (
    <div>
        <Header />
        <div>
            <button
            onClick={() => navigation(-1)}
            >
                Back
            </button>
        </div>
        {
            loading ? 
            (<div>
                <p>Loading</p>
            </div>) : 
            blog ? 
            (<div>
                <BlogDetails post={blog} />
                <h2>Related Blogs</h2>
                {
                    relatedBlogs.map( (post) => (
                        <div key = {post.id}>
                            <BlogDetails post={post} />
                        </div>
                    ) )
                }
            </div>) : 
            (<div>
                <p>No Blog Found</p>
            </div>)
        }
    </div>
  )
}

export default BlogPage