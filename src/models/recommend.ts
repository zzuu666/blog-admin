export interface RecommendBase {
    article_id: string
    reason: null | string
}
export interface Recommend extends RecommendBase {
    id: string
    article_author: string
    article_title: string
}
