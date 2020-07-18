import React from 'react';
import CollectionOverviewContainer from "../../components/collections-overview/collection-overview.container";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import CollectionPageContainer from "../collection/collection.container";

class ShopPage extends React.Component {


    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync()
    }

    render() {
        const {match} = this.props;

        return (
            <div className="shop-page">
                <Route component={CollectionOverviewContainer} exact path={`${match.path}`}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});


export default connect(null, mapDispatchToProps)(ShopPage);