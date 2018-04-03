//Lib
import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

//Component
import Loading from '../common/Loading';
import ProductListControl from '../component/ProductListControl';
import Pagination from '../component/Pagination';

//Image
import * as ProductImage1 from '../assets/images/shoes1.png';
import * as ProductImage2 from '../assets/images/shoes2.png';
import * as ProductImage3 from '../assets/images/shoes3.png';
import * as ProductImage4 from '../assets/images/shoes4.png';
import * as ProductImage5 from '../assets/images/shoes5.png';
import * as ProductImage6 from '../assets/images/shoes6.png';
import * as FavoriteIcon from '../assets/images/favorite_icon.png';
import * as FavoriteActiveIcon from '../assets/images/favorite_active_icon.png';
import * as PackgageIcon from '../assets/images/package_icon.png';
import * as PackgageActiveIcon from '../assets/images/package_active_icon.png';

interface Product {
    sku: string;
    name: string;
    price: number;
    images: string;
    sizes: number[];
    colors: string[];
    description: string;
    type: string;
}
const WhenLoadedMoreData = (result) => (prevState) => ({
    hits: [...prevState.hits, ...result.hits],
    page: result.page,
    isError: false,
    isLoading: false,
});

const WhenLoadedInitData = (result) => (prevState) => ({
    hits: result.hits,
    page: result.page,
    isError: false,
    isLoading: false,
});

const whenLoadMoreFail = (prevState) => ({
    isError: true,
    isLoading: false,
});

const queriesCombiner = (where) => {
    return {
        name: where
    }
};

// hàm tạo url tới api để lấy danh sách product
const getProductsUrl = (where:string, page:number, hitsPerPage:number) =>
    `http://localhost:1235/api/product?where=${JSON.stringify(queriesCombiner(where))}&page=${page}&hitsPerPage=${hitsPerPage}`;

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hits: [],
            page: null,
            isLoading: false,
            isError: false,
            isShowGrid: true,
        };
    }

    onInitialSearch = (e) => {
        e.preventDefault();

        const { value } = this.input;

        if (value === '') {
            return;
        }

        this.fetchProducts(value, 0);
    };

    onPaginatedSearch = (e) =>
        this.fetchProducts(this.input.value, parseInt(this.state.page, 10) + 1);

    fetchProducts = (where, page, hitsPerPage = 10) => {
        this.setState({ isLoading: true });
        fetch(getProductsUrl(where, page, hitsPerPage))
            .then(response => response.json())
            .then(result => {
                this.applyProductData(result, page)
            })
            .catch(this.onFailed);
    };

    applyProductData = (result, page) => {
        page === 0
            ? this.setState(WhenLoadedInitData(result))
            : this.setState(WhenLoadedMoreData(result));
    };

    onFailed = () =>
        this.setState(whenLoadMoreFail);

    setGrid = () => {
        this.setState({ isShowGrid: !this.state.isShowGrid });
    }

    isFavoriteActive = (sku) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let index = favorites.indexOf(sku);
        return index > -1;
    };

    onFavoriteClick = (sku) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let index = favorites.indexOf(sku);
        this.isFavoriteActive(sku) ? favorites.splice(index, 1) : favorites.push(sku);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.forceUpdate();
    };

    isInCart = (sku) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let index = cart.indexOf(sku);
        return index > -1;
    };

    addToCart = (sku) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let index = cart.indexOf(sku);
        this.isInCart(sku) ? cart.splice(index, 1) : cart.push(sku);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.forceUpdate();
    };

  render() {
    return (
        <div className="page">
            <div className="interactions">
                <form onSubmit={this.onInitialSearch}>
                    <input type="text" ref={node => this.input = node} />
                    <button type="submit">Search product name (ex: shoes-45)</button>
                </form>
            </div>
            <ProductListControl
                isShowGrid={this.state.isShowGrid}
                onControlClick={this.setGrid}
            />
            <AdvancedProductList
                list={this.state.hits}
                isError={this.state.isError}
                isLoading={this.state.isLoading}
                isShowGrid = {this.state.isShowGrid}
                page={this.state.page}
                onPaginatedSearch={this.onPaginatedSearch}
                isFavorite = {this.isFavoriteActive}
                onFavoriteClick={this.onFavoriteClick}
                isInCart = {this.isInCart}
                addToCart={this.addToCart}
            />
        </div>
    )
  }
}

// component danh sách sản phẩm, sử dụng các prop truyền vào ở trên
const ProductListC = ({ list, isShowGrid, isFavorite, onFavoriteClick, isInCart, addToCart }) =>
    <div
        className={`flex ${isShowGrid ? 'row': ''}`}
    >
        {list.map(item => <div className="flex-item text-center" key={item.sku}>
            <div className="product__box">
                <p className="product__type">SHOE</p>
                <h3 className="product__name">{item.name}</h3>
                <img src={`http://localhost:1235${item.images[0]}`} alt={item.name} className="product__image" />
                <p className="product__price">$ {item.price}</p>
                <button
                    className="product__favorite-icon product__top-icon"
                    onClick={() =>  onFavoriteClick(item.sku)}
                >
                    <img
                        src={isFavorite(item.sku) ? FavoriteActiveIcon : FavoriteIcon}
                        alt="Favorite icon"
                    />
                </button>
                <button
                    className="product__package-icon product__top-icon"
                    onClick={() =>  addToCart(item.sku)}
                >
                    <img
                        src={isInCart(item.sku) ? PackgageActiveIcon : PackgageIcon}
                        alt="Package icon"
                    />
                </button>
            </div>
        </div>)}
    </div>;

const loadingCondition = props =>
    props.isLoading;

// HOC thêm loading khi đang tải dữ liệu
const withLoading = (conditionFn) => (Component) => (props) =>
    <div>
        <Component {...props} />

        <div className="">
            {conditionFn(props) && <span>Loading...</span>}
        </div>
    </div>;

const paginatedCondition = props =>
    props.page !== null && !props.isLoading && props.isError;

// HOC thêm nút Try Again khi infinite load bị lỗi
const withPaginated = (conditionFn) => (Component) => (props) =>
    <div>
        <Component {...props} />
        <div className="try-again_btn">
            {
                conditionFn(props) &&
                <div>
                    <div>
                        Something went wrong...
                    </div>
                    <button
                        type="button"
                        onClick={props.onPaginatedSearch}
                    >
                        Try Again
                    </button>
                </div>
            }
        </div>
    </div>;

const infiniteScrollCondition = props =>
    (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
    && props.list.length
    && !props.isLoading
    && !props.isError;

// HOC tự động load thêm dữ liệu khi kéo chuột đến gần cuối trang
const withInfiniteScroll = (conditionFn) => (Component) =>
    class WithInfiniteScroll extends React.Component {
        componentDidMount() {
            window.addEventListener('scroll', this.onScroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll, false);
        }

        onScroll = () =>
            conditionFn(this.props) && this.props.onPaginatedSearch();

        render() {
            return <Component {...this.props} />;
        }
    };

// dùng thư viện recompose để chạy các HOC tuần tự
// link: https://github.com/acdlite/recompose
// ở đây truyền các điều kiện vào HOC nhằm mục đích tách riêng phần xử lý của HOC và phần logic
const AdvancedProductList = compose(
    withLoading(loadingCondition),
    withInfiniteScroll(infiniteScrollCondition),
    withPaginated(paginatedCondition),
)(ProductListC);
