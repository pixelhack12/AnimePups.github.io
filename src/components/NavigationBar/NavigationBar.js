import React from 'react';
import './NavigationBar.css';
import services from '../../services';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: {}
		};
	}
  
	componentDidMount() {
	  fetch("http://192.168.50.106:80/api/services")
		.then(res => res.json())
		.then(
			(result) => {
				console.log(result);
				this.setState({
					isLoaded: true,
					items: result
				});
			},
			// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
			// чтобы не перехватывать исключения из ошибок в самих компонентах.
			(error) => {
				this.setState({
				isLoaded: true,
				error
				});
			}
			)
	}
	menuBtnChange() {
		var sidebar = document.querySelector(".sidebar");
		sidebar.classList.toggle("open");
		var closeBtn = document.querySelector("#btn");
		if(sidebar.classList.contains("open")){
			closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
		} else {
			closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
		}
	}
	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Ошибка: {error.message}</div>;
		} else if (!isLoaded) {
			return <Loading/>;
		} else {
			return (
				<div className="sidebar">
					<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
					<div className="logo-details">
						<i className='bx bxl-c-plus-plus icon'></i>
						<div className="logo_name">CodingLab</div>
						<i className='bx bx-menu' onClick={this.menuBtnChange} id="btn"></i>
					</div>
					<ul className="nav-list" onLoad={this.test}>
						{services.map((service, i) => (
							<li key={i}>
								<Link to={service.id} className='sidebar-item'>
									<img
										src={service.icon}
										alt={service.title}
									/>
									<span className="links_name">{service.title}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			);
	  }
	}
}
export default NavigationBar;