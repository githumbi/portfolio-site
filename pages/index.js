// import dynamic from "next/dynamic";
// import { config } from "dotenv";
import Link from "next/link";
import ContactForm from "../src/components/ContactForm";
import TestimonialSlider from "../src/components/TestimonialSlider";
import Layout from "../src/layout/Layout";
import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "../utils/Date";
import { fetchMediumPosts } from "../lib/fetchMediumPosts";
import { testImage } from "../public/assets/images/blog7.jpg";
import { useState, useEffect } from "react";

// const ProjectIsotop = dynamic(() => import("../src/components/ProjectIsotop"), {
//   ssr: false,
// });
const Index = ({ projects, blogs, posts }) => {
  const [image, setImage] = useState("/assets/images/profile-pic.png");

  useEffect(() => {
    const checkSkin = () => {
      const isLightSkin = document.body.classList.contains("light-skin");
      setImage(
        isLightSkin
          ? "/assets/images/profile-pic.png"
          : "/assets/images/profile-pic-light.png"
      );
    };

    checkSkin(); // Run on mount

    // Optional: Observe class changes
    const observer = new MutationObserver(checkSkin);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);
  return (
    <Layout>
      <section className="section section-started">
        <div className="container">
          {/* Hero Started */}
          <div className="hero-started">
            <div className="slide">
              <img src={image} alt="Image of Joseph" />
            </div>
            <div className="content">
              <div className="titles">
                <div className="subtitle">Product Designer 🎨</div>
              </div>
              <div className="description">
                <p>
                  I help companies craft customer-centric products through
                  research-driven design.
                </p>

                <div className="social-links">
                  {/* <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/githumbi_jk"
                  >
                    <i aria-hidden="true" className="fab fa-twitter" />
                  </a> */}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/joseph-githumbi/"
                  >
                    <i aria-hidden="true" className="fab fa-linkedin" />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.behance.net/josephkaguri1"
                  >
                    <i aria-hidden="true" className="fab fa-behance" />
                  </a>
                </div><br />
                <a href="#contact-section" class="btn">
                  <span>Let's talk</span>
                </a>
              </div>
            </div>
          </div>
          <div className="row clients-items">
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img
                  src="assets/images/kcb.webp"
                  alt=""
                  className="movable-logo"
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img
                  src="assets/images/pezesha.webp"
                  alt=""
                  className="movable-logo"
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img
                  src="assets/images/sotehub.webp"
                  alt=""
                  className="movable-logo"
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 align-center">
              <div className="clients-item">
                <img
                  src="assets/images/vet_mkononi.webp"
                  alt=""
                  className="movable-logo"
                />
              </div>
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
            <h2 className="m-title">Projects</h2>
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
                        <span className="desc py-2">
                          <span className="name">{project.title}</span>
                          <span className="category">{project.subtitle}</span>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div className="works-items works-list-items row">
              <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-branding sorting-photo ">
                <div className="works-item">
                  <Link href="https://www.behance.net/gallery/143839299/Restaurant-Reservation-UX-Design">
                    <a target="_blank">
                      <span className="image">
                        <span className="img">
                          <img
                            src="/assets/images/reservation-app.png"
                            alt="Reservation Map"
                          />
                          <span className="overlay" />
                        </span>
                      </span>
                      <span className="desc py-2">
                        <span className="name">Reservation app</span>
                        <span className="category">UI design</span>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
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
          {posts.map((post) => (
            <div key={post.guid} className="archive-item">
              <div className="image">
                <Link href={`/blog/${encodeURIComponent(post.guid)}`}>
                  <a>
                    <img
                      src={
                        post.description
                          .toString()
                          .match(/<img[^>]+src="([^">]+)"/)[1]
                      }
                      alt="Usability Secrets to Create Better User Interfaces"
                    />
                  </a>
                </Link>
              </div>
              <div className="desc">
                <div className="category">
                  {post.categories}
                  <br />

                  <span>
                    <time
                      dateTime={formatPublishedDateForDateTime(post.pubDate)}
                    >
                      {formatPublishedDateForDisplay(post.pubDate)}
                    </time>
                  </span>
                </div>
                <h3 className="title">
                  <Link
                    href={`/blog/${encodeURIComponent(
                      post.title.split(" ").join("-")
                    )}`}
                  >
                    <a>{post.title}</a>
                  </Link>
                </h3>
                <img src={testImage} />
                <div className="text">
                  {/* <p>
                    {post.description
                      .toString()
                      .match(/<p[^>]*>(.*?)<\/p>/)?.[1]
                      .slice(0, 200) + "..." || ""}
                  </p> */}
                  <div className="readmore">
                    <Link
                      href={`/blog/${encodeURIComponent(
                        post.title.split(" ").join("-")
                      )}`}
                    >
                      <a className="lnk">Read more</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactForm />
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const posts = await fetchMediumPosts();
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
      posts,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
