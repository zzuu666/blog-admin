export interface RecommendCreate {
    article_id: string
    reason: null | string
}
export interface Recommend extends RecommendCreate {
    id: string
    article_author: string
    article_title: string
}
