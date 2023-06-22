// import dynamic from "next/dynamic";
// import { config } from "dotenv";
import Link from "next/link";
import ContactForm from "../src/components/ContactForm";
import TestimonialSlider from "../src/components/TestimonialSlider";
import Layout from "../src/layout/Layout";

// const ProjectIsotop = dynamic(() => import("../src/components/ProjectIsotop"), {
//   ssr: false,
// });
const Index = ({ projects, blogs }) => {
  return (
    <Layout>
      <section className="section section-started">
        <div className="container">
          {/* Hero Started */}
          <div className="hero-started">
            <div className="slide">
              <img src="assets/images/profilepic.webp" alt="" />
            </div>
            <div className="content">
              <div className="titles">
                <div className="subtitle">Hi, it’s Githumbi</div>
                <h2>
                  UX Designer helping companies target right customers through
                  research and design.
                </h2>
              </div>
              {/* <div className="description">
                <p>
                  UX Designer helping companies target right customers through
                  research and design.
                </p>
                <div className="social-links">
                  <a target="_blank" rel="noreferrer" href="#">
                    <i aria-hidden="true" className="fab fa-twitter" />
                  </a>
                  <a target="_blank" rel="noreferrer" href="#">
                    <i aria-hidden="true" className="fab fa-dribbble" />
                  </a>
                  <a target="_blank" rel="noreferrer" href="#">
                    <i aria-hidden="true" className="fab fa-behance" />
                  </a>
                </div>
              </div> */}
            </div>
            <div className="info-list">
              <ul>
                <li>
                  Born in <strong>NewYork</strong>
                </li>
                <li>
                  Experience <strong>+ Years</strong>
                </li>
                <li>
                  Date of Birth <strong>27 June 1992</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-bg section-parallax section-parallax-5"
        id="works-section"
      >
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2 className="m-title">My Projects</h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div className="text">
                <p>A Collection of my favorite projects</p>
                {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
              </div>
            </div>
          </div>
          {/* Works */}
          <div className="works-box">
            {projects.map((project) => (
              <div
                key={project.id}
                className="works-items works-list-items row"
              >
                <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-branding sorting-photo ">
                  <div className="works-item">
                    <Link href={`/${project.slug}`}>
                      <a>
                        <span className="image">
                          <span className="img">
                            <img src={project.headerimage.url} alt="Tree Map" />
                            <span className="overlay" />
                          </span>
                        </span>
                        <span className="desc">
                          <span className="name">{project.title}</span>
                          <span className="category">{project.subtitle}</span>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-bg" id="blog-section">
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2 className="m-title">Articles</h2>
          </div>
        </div>
        {/* Blog */}
        <div className="blog-items">
          {blogs.map((blog) => (
            <div className="archive-item">
              <div className="image">
                <Link href={`/${blog.slug}`}>
                  <a>
                    <img
                      src="assets/images/blog4.jpg"
                      alt="Usability Secrets to Create Better User Interfaces"
                    />
                  </a>
                </Link>
              </div>
              <div className="desc">
                <div className="category">
                  {blog.topic}
                  <br />
                  <span>{blog.publishedAt}</span>
                </div>
                <h3 className="title">
                  <Link href={`blog/${blog.slug}`}>
                    <a>{blog.title}</a>
                  </Link>
                </h3>
                <div className="text">
                  {/* <p>
                    Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                    mattis. Aliquam vel sem vel velit efficitur malesuada. Donec
                    arcu lacus, ornare eget…{" "}
                  </p> */}
                  <div className="readmore">
                    <Link href="/blog-single">
                      <a className="lnk">Read more</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <ContactForm /> */}
    </Layout>
  );
};
export default Index;

export async function getStaticProps() {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query {
  projectsCollection {
    items {
      title
      subtitle
      headerimage {
        url
      }
      slug
    }
  },
    blogCollection {
    items {
      publishedAt
      topic
      title
      slug
    }
  }
}
        `,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return { props: {} };
  }
  const { data } = await result.json();
  const projects = data.projectsCollection.items;
  const blogs = data.blogCollection.items;

  return {
    props: {
      projects,
      blogs,
    },
  };
}
