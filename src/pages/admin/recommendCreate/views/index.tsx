import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { StoreState } from '../../../../store'
import { Recommend, RecommendCreate } from '../../../../models/recommend'
import { fetchStatus } from '../../../../utils/fetch'
import { recommendPostCreate } from '../actions'

interface Props extends RouteComponentProps {
    recommend: Recommend | RecommendCreate
    status: fetchStatus
    recommendPostCreate: (recommend: RecommendCreate) => void
}

const RecommendCreate: FunctionComponent<Props> = props => {
    return <div>1</div>
}

const mapStateToProps = (store: StoreState) => ({
    recommend: store.recommendCreate.recommend,
    status: store.recommendCreate.status
})

const mapDispatchToProps = (dispath: Dispatch<any>) => ({
    recommendPostCreate(recommend: RecommendCreate) {
        dispath(recommendPostCreate(recommend))
    }
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecommendCreate)
)
