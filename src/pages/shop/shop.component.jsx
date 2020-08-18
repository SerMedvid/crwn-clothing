import React, {useEffect} from 'react';
import CollectionOverviewContainer from "../../components/collections-overview/collection-overview.container";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCollectionStarts} from "../../redux/shop/shop.actions";
import CollectionPageContainer from "../collection/collection.container";

const ShopPage = ({fetchCollectionStarts, match}) => {
    useEffect(() => {
        fetchCollectionStarts();
    }, [fetchCollectionStarts])

    return (
        <div className="shop-page">
            <Route component={CollectionOverviewContainer} exact path={`${match.path}`}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStarts: () => dispatch(fetchCollectionStarts())
});


export default connect(null, mapDispatchToProps)(ShopPage);