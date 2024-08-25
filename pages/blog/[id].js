// pages/post/[id].js

import { fetchMediumPosts } from "../../lib/fetchMediumPosts";
import Layout from "../../src/layout/Layout";
import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "../../utils/Date";
const BlogPost = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  

  return (
    <Layout extraWrapClass={"single-post"}>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* titles */}
              <div className="m-titles">
                <h1 className="m-title">{post.title}</h1>
                <div className="m-category">
                  <a href="#" rel="category tag">
                    UX Design
                  </a>{" "}<br></br>
                  <span>
                    <time
                      dateTime={formatPublishedDateForDateTime(post.pubDate)}
                    >
                      {formatPublishedDateForDisplay(post.pubDate)}
                    </time>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Single Post */}
      <section className="section section-inner m-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">
              {/* image */}
              {/* <div className="m-image-large">
                <div className="image">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(assets/images/blog5.jpg)" }}
                  />
                </div>
              </div> */}
              {/* content */}
              <div className="description">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
            {/* Comments */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const posts = await fetchMediumPosts();
  const paths = posts.map((post) => ({
    params: { id: post.guid },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const posts = await fetchMediumPosts();
  const post = posts.find((post) => post.guid === params.id);

  return {
    props: {
      post: post || null,
    },
    revalidate: 60,
  };
}

export default BlogPost;
