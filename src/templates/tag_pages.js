import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard } from '../components/common'
import { MetaData } from '../components/common/meta'

const Tag = ({ data, location }) => {
    const tag = data.ghostTag
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout>
                <header>
                    <div>
                        <h1>{tag.name}</h1>
                        <h2>
                            {tag.description ?
                                tag.description :
                                `A collection of posts`
                            }
                        </h2>
                    </div>
                </header>
                <main>
                    <div>
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </div>
                </main>
            </Layout>
        </>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default Tag

export const pageQuery = graphql`
    query GhostTagPagesQuery($limit: Int!, $skip: Int!) {
        ghostTag {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            limit: $limit,
            skip: $skip,
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
