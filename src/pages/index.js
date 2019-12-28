import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} >
        <Container>
          <Row>
            <CardDeck style={{
              display: 'flex',
              flexFlow: 'row wrap'
            }}>
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <Col xs={12} sm={6} style={{ marginBottom: '50px' }}>
                    <Link to={node.fields.slug}>
                      <Card bg="dark" text="white">
                        <Card.Header>
                          <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                            {title}
                          </Link></Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: node.frontmatter.description || node.excerpt,
                              }}
                            />
                            <small>read more</small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })}
            </CardDeck>
          </Row>
        </Container>
        <SEO title="All posts" />
      </Layout >
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`
