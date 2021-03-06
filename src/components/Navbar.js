import React, { useState, useEffect } from 'react'
import { Link, NavLink, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Idioma from './Idioma'
import axios from 'axios'
import BarraBusqueda from './BarraBusqueda'

const Navbar = (props) => {
	const [name, setName] = useState('')
	const [openMenu, setOpenMenu] = useState(false)
	const [cerrarSesion, setcerrarSesion] = useState(false)
	const [toggleModal, setToggleModal] = useState(false)

	useEffect(() => {
		if (localStorage.usertoken) {
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			setName(decoded.username)
		}
		traerIdiomas()
		return () => {}
	}, [])

	const traerIdiomas = async () => {
		const response = await axios.get(
			'https://ddragon.leagueoflegends.com/cdn/languages.json'
		)
		const data = await response.data
	}

	const LogOut = () => {
		localStorage.removeItem('usertoken')
		setcerrarSesion(true)
	}

	return (
		<div>
			{toggleModal ? (
				<BarraBusqueda close={() => setToggleModal(false)} />
			) : null}

			<nav>
				{cerrarSesion ? <Redirect to="/" /> : null}

				<Link to="/">
					<img className="logo" src="/img/logo.png" alt="Logo" />
				</Link>
				<div className="nav-container">
					<NavLink to="/champions" activeClassName="selectedNav">
						Lista de campeones
					</NavLink>
					<NavLink to="/favorites" activeClassName="selectedNav">
						Campeones favoritos
					</NavLink>
					<NavLink to="/builds" activeClassName="selectedNav">
						Builds
					</NavLink>
					<img
						className="search-icon"
						src="/img/search.svg"
						alt="search"
						onClick={() => setToggleModal(true)}
					/>
					{/* <img
					onClick={() => setToggleModal(true)}
					className="idioma-icon"
					src="/img/idioma.svg"
					alt="idioma"
				/> */}
					{!localStorage.usertoken ? (
						<div className="lr-container">
							<Link to="/login">Iniciar sesión</Link>
							<Link to="/register">
								<div className="register-btn">Regístrarse</div>
							</Link>
						</div>
					) : (
						<div className="container-profile-menu">
							<div
								className="profile-nav"
								onClick={() => setOpenMenu(!openMenu)}
							>
								<span>{name}</span>
								<img
									className="foto-perfil"
									src="/img/foto-perfil.png"
									alt="Profile"
								/>
							</div>
							{openMenu ? (
								<div className="profile-menu">
									<Link className="item-profile-menu" to="/builds">
										<div>
											<div className="circle-menu">
												<img src="/img/builds.svg" alt="" />
											</div>
											<span>Builds</span>
										</div>
									</Link>
									<Link className="item-profile-menu" to="/favorites">
										<div>
											<div className="circle-menu">
												<img src="/img/starBlack.svg" alt="" />
											</div>
											<span>Favoritos</span>
										</div>
									</Link>
									<div
										className="item-profile-menu log-out"
										onClick={() => LogOut()}
									>
										<div>
											<div className="circle-menu">
												<img src="/img/power.svg" alt="" />
											</div>
											<span>Cerrar sesión</span>
										</div>
									</div>
								</div>
							) : (
								''
							)}
						</div>
					)}
				</div>
			</nav>
		</div>
	)
}

export default Navbar
