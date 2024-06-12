import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const AboutUs = () => {
  return (
    <div>

      <div className="card mb-3">
        <img src="/src/assets/restaurantePanoramico.jpeg" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title fw-bold fs-1">CONOCENOS</h5>
          <p className="card-text fst-italic m-3">Bienvenidos a SABORES DEL MUNDO, donde la pasión por la gastronomía se encuentra con un ambiente acogedor y elegante. Desde el primer día, nuestro objetivo ha sido ofrecer a nuestros clientes una experiencia culinaria inolvidable, combinando ingredientes frescos y de alta calidad con técnicas culinarias innovadoras y tradicionales.</p>
          <p className="card-text fst-italic m-3">Nuestro equipo de chefs talentosos y dedicados se esfuerza por crear platos que no solo deleiten el paladar, sino que también cuenten una historia. Cada receta es cuidadosamente elaborada para resaltar los sabores auténticos y brindar una verdadera experiencia sensorial.</p>
          <p className="card-text fst-italic m-3">En SABORES DEL MUNDO, creemos que la buena comida une a las personas. Por eso, hemos creado un espacio donde cada detalle, desde la decoración hasta el servicio, está diseñado para que te sientas como en casa. Ya sea para una cena íntima, una reunión familiar o una celebración especial, estamos aquí para hacer de cada momento algo memorable.</p>
          <p className="card-text fst-italic m-3">Te invitamos a explorar nuestro variado menú, disfrutar de nuestra carta de vinos seleccionados y dejarte llevar por la calidez de nuestro servicio. Gracias por elegirnos y permitirnos ser parte de tus momentos más especiales.</p>
          <p className="card-text fst-italic m-3"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>

    </div>
  )
}

export default AboutUs