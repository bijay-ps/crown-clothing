import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionStartAsync, updateCollections } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }
  
  render() {
    const { match, isCollectionFetching } = this.props;
    return (
        <div className='shop-page'>
          <Route
              exact
              path={`${match.path}`}
              render={props => (
                  <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
              )}
          />
          <Route
              path={`${match.path}/:collectionId`}
              render={props => (
                  <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />
              )}
          />
        </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);
