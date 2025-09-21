import { Button } from "../../components/Button/Button";
import "./CreateStory.css"
import { StoryContext } from "../../store/StoryContext";
import { useContext } from "react";
import type { ChangeEvent,FormEvent } from "react";
import type { StoryData } from "../../store/StoryContext";

export const CreateStory = () => {

  const context = useContext(StoryContext);
  if (!context) throw new Error("StoryContext must be used within a StoryProvider");
  const { storyData, updateData,storyOutput, generateStory } = context;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData(name as keyof StoryData, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(storyData); 
  };

  
  return (
    <form className="create-container"  onSubmit={handleSubmit}>
      <p className="description"> Fill the blanks and let the AI sprinkle tonight’s story.</p>
      <div className="create-box">
        <div className="input-part">
          <div className="create-double"> 
            <div className="create-name">
              <div className="aligned-items">
                <i className="fa-regular fa-user"></i>
                <p>Name</p>
              </div>
              <input 
               type="text" 
               placeholder="Enter a name"
               name="name"
               value={storyData.name}
               onChange={handleChange}
               ></input>
            </div>
            <div className="create-age">
                <div className="aligned-items">
                  <i className="fa-regular fa-calendar"></i>
                  <p>Age</p>
                </div>
                <input  
                  type="number"
                  placeholder="Enter age"
                  min="1" 
                  name="age"
                  value={storyData.age}
                  onChange={handleChange}
                ></input>
            </div>
          </div>
            <div className="create-theme">
              <div className="aligned-items">
                <i className="fa-regular fa-lightbulb"></i>
                <p>Story Theme</p>
              </div>
              <input type="text"
               placeholder="e.g., Friendship, Patience"
               name="theme"
               value={storyData.theme}
                onChange={handleChange}
               ></input>
            </div>
            <div className="create-subject">
              <div className="aligned-items">
                <i className="fa-regular fa-comment"></i>
                <p>Story Subject</p>
              </div>
              <input type="text"
               placeholder="How should the story develop"
               name="subject"
               value={storyData.subject}
               onChange={handleChange}
               ></input>
            </div>
            <div className="create-atmosp">
              <div className="aligned-items">
                <i className="fa-regular fa-cloud"></i>
                <p>Atmosphere</p>
              </div>
              <select 
              name="atmosphere"
              value={storyData.atmosphere}
              onChange={handleChange}>
                <option value="" disabled selected>Select Atmosphere</option>
                <option>Cheerful</option>
                <option>Adventurous</option>
                <option>Mysterious</option>
                <option>Emotional</option>
                <option>Heroic</option>
              </select>
            </div>
            <div className="create-double">
              <div className="create-charac">
                <div className="aligned-items">  
                  <i className="fa-solid fa-user-group"></i>
                  <p>Side characters</p>
                </div>
                <input type="text"
                 placeholder="e.g., best friend, pet"
                 name="characters"
                 value={storyData.characters}
                 onChange={handleChange}
                 ></input>
              </div>           
              <div className="create-length">
                <div className="aligned-items">
                  <i className="fa-regular fa-clock"></i>
                  <p>Story Length</p>
                </div>
                <select name="length"
                 value={storyData.length}
                 onChange={handleChange}             
                >
                  <option value="" disabled selected>Select Length</option>
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>
              </div>
            </div>
            <div className="create-button">
              <Button label="Create" bgColor={true} onClick={generateStory}></Button>
            </div>
        </div>
        <div className="output-part">
          <p className="story-text">
            STORY:<br />
            {storyOutput}
          </p>
        </div>
      </div>
    </form>
  );
};
