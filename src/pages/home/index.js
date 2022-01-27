import React from 'react';
import services from '../../services';
import './index.css';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
class HomePage extends React.Component {
	
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: {}
		};
	}
	componentDidMount() {
		fetch("https://shikimori.one/api/topics?forum=news&limit=30")
			.then(res => res.json())
			.then(
				(result) => {
					
					this.setState({
						isLoaded: true,
						items: result
					});
				},
				(error) => {
					this.setState({
					isLoaded: true,
					error
					});
				}
				)
	}
	render() {
		const { error, isLoaded, items } = this.state;
		console.log(items);
		if (error) {
			return <div>Ошибка: {error.message}</div>;
		} else if (!isLoaded) {
			return <Loading/>;
		} else {
            return (
                <div className='wrapper'>
                    <div className='services'>
                        {services.map((el, index)=>{
                            return <Link className='service' key={index} to={"/"+el.id}>
                                <img src={el.icon}/>
                                <div className='title'>{el.title}</div>
                            </Link>
                        })}
                    </div>
                    <div className='cards w-100'>
                        {items.map((el, index)=>{
                            return <a className='shikimori-card' key={index}>
                                <div className='title'>{el.topic_title}</div>
								{function(){
									if (el.html_footer){
										var parser = new DOMParser();
										var footer = parser.parseFromString(el.html_footer, 'text/html');
										var array = new Array();
										[].forEach.call(footer.querySelectorAll('img'), (img, i)=>{
											array.push(<img src={img.attributes.src.nodeValue} key={i}/>);
										})
										return array;
									}
								}()}
                            </a>
                        })}
                    </div>
                </div>
            );
        }
    }
}
export default HomePage;
