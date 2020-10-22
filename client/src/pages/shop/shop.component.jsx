import React, {useEffect, lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCollectionStarts} from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner.component";

const CollectionOverviewContainer = lazy(() => import('../../components/collections-overview/collection-overview.container'))
const CollectionPageContainer = lazy(() => import('../collection/collection.container'))

const ShopPage = ({fetchCollectionStarts, match}) => {
    useEffect(() => {
        fetchCollectionStarts();
    }, [fetchCollectionStarts])

    return (
        <div className="shop-page">
            <Suspense fallback={<Spinner />}>
                <Route component={CollectionOverviewContainer} exact path={`${match.path}`}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </Suspense>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStarts: () => dispatch(fetchCollectionStarts())
});


export default connect(null, mapDispatchToProps)(ShopPage);