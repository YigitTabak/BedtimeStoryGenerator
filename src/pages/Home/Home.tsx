import './Home.css'
import HomePhoto from "../../assets/HomePhoto.png"
import { Button } from '../../components/Button/Button'

export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={HomePhoto} alt="Home" className="home-photo" />
        <div className="home-photo-overlay">
            <p className="home-description">
                Experience the magic of bedtime and sweet dreams with <span className="highlight">AI Powered</span> personalized stories
                for your child! Every tale is uniquely crafted just for them,
                sparking imagination and wonder while gently guiding them into a peaceful sleep.
                Create unforgettable bedtime moments with just a click.
            </p>
          <Button to="/create" label="Create a Story" bgColor={true} />
        </div>
      </div>
    </div>
  )
}