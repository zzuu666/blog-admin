import React, { useEffect, FunctionComponent } from 'react'
import {
    recommendEditUpdate,
    recommendEditShow,
    SubmitParams,
    Action
} from '../actions'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { fetchStatus } from '../../../../utils/fetch'
import { RecommendBase } from '../../../../models/recommend'
import { Article } from '../../../../models/article'
import { StoreState } from '../../../../store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface Props extends RouteComponentProps {
    status: fetchStatus
    recommend: RecommendBase
    suggestions: Article[]
    fetchOriginRecommend: (id: string) => void
    submitNewRecommend: (params: SubmitParams) => void
}

const RecommendEdit: FunctionComponent<Props> = props => {
    return <div>1</div>
}

const mapStateToProps = (store: StoreState) => ({
    status: store.recommentEdit.status,
    recommend: store.recommentEdit.recommend,
    suggestions: store.suggestion.results
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchOriginRecommend(id: string) {
        dispatch(recommendEditShow(id))
    },
    submitNewRecommend(params: SubmitParams) {
        dispatch(recommendEditUpdate(params))
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecommendEdit)
)
