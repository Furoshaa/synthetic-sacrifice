import { useState, useEffect, useRef } from 'react'
import './App.css'
import ThemeSwitch from './ThemeSwitch'

// Define types for section structure
interface Section {
  id: string;
  title: string;
  content: string;
  isParent: boolean;
  children?: Section[];
}

// Game data sections with hierarchical structure
const mainSections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: "Welcome to the wolrd of Synthetic Sacrifice. On this page i will present you every aspect of the game that has already been decided.",
    isParent: false
  },
  {
    id: 'inspiration',
    title: 'Inspiration',
    content: "I took inspiration from the game \"Cyberpunk 2077\" for the style. I took a big inspiration \"Octopath Traveler\" for the whole style of the game.",
    isParent: false
  },
  {
    id: 'features',
    title: 'Features',
    content: `
The gameplay mechanic will be very simple : Move your characterwoth the standard movement controls. Interact with a character or an item to open a context menu that will opperate as an interaction menu. You can for exemple, hen interracting with an item, see it's stats, add to your inventory or equip it directly. For the character you could for exemple Talk, fight or anaylze.   
An XP system that would allow the character to get better cybernetics through an upgrade tree. XP is earned through main quests, side quests and fights. 
Different weapons are lootable, purchasable or even granted through finishing some quests. Those weapons have different statistics. Melee weapons such as katana, or firearms from handguns to big sniper rifles and massive machine guns. 
Through the choices that the player made during the game he could see 7 different endings.  
There will be endgame content that are basically side quests so that the player can keep getting upgrades until he's strong enough to beat the final optional boss.`,
    isParent: false
  },
  {
    id: 'story',
    title: 'Story',
    content: '',
    isParent: true,
    children: [
      {
        id: 'story-awakening',
        title: 'The Awakening',
        content: `The player wakes up in a dark alley, bleeding out. Their right arm and left leg are gone. Pain flooding every nerve. They're leaning against the cold wall of an abandoned ripper doc clinic, barely holding on. With no other choice, they drag themselves inside. The place is a wreck. Broken tools, shattered screens, and cybernetic parts scattered across the floor. In the center, an old cybernetic installation chair is found and it looks like it's still working somehow. The player pulls themselves into the seat and activates it. 
Metal arms clamp down. The machine forcefully installs cybernetic ports where their limbs used to be. The pain is unbearable, unlike anything a human should endure. Their body convulses, vision blurs, and then everything goes black. 
When they come back to life, they feel… empty. Their mind is a blank slate. No past, no memories. 
Just pain. 
They struggle to move, dragging themselves forward with their one remaining arm, leaving a smear of blood on the floor. Then, among the wreckage, they spot a discarded cyber-leg. It's dented, rusted but it's their only chance. 
They jam it into their leg port. A violent shock tears through their body as the nerve link connects. Their vision darkens for a moment. The leg twitches, unresponsive at first, but slowly, it obeys. 
It's rough, but it works. They push themselves up, unsteady but standing. 
They don't know who they are. They don't know what happened. But they're alive. And they need to keep moving.`,
        isParent: false
      },
      {
        id: 'story-getting-out',
        title: 'Getting Out',
        content: `Now that the player can stand, it's time to go out and try to retrieve their memory. The player leaves the clinic and start walking around the undercity. The place is shady and feels abandoned. At some point the player will come across some weird psycho. He can choose to talk to them which will result in a fight. Considering he only has one arm this won't be so easy. After killing them, the player will have the option to loot them to find a compatible cyber arm.`,
        isParent: false
      },
      {
        id: 'story-first-contact',
        title: 'The First Contact',
        content: `By walking into the under-city, the player will start to leave it. He will then go through a camp of rebels. If he wants to leave the area he will have to talk to one of the rebels. At this point the player will have to complete his first real quest where the rebel asks him a favor in return for letting him go out. After completing this first quest, the rebel will propose to him to join the rebels which is the first important choice of the game. Either way he'll be able to get out of there.  
If the player joins the rebels. 
The player will have to follow a series of quests for the rebels who are gonna give him a new arm and leg to be more efficient. 
If the player doesn't join the rebels. 
The player will be able to leave the undercity and just complete the side quest in the rest of the town to gather equipment.`,
        isParent: false
      },
      {
        id: 'story-remember',
        title: 'Remember',
        content: `At some point, either from a quest from the rebels or from a random quest, the player will meet Grim Fang. From here the player will start having flash of his past when he got tortured and dismembered by him. He is a lot different from your memory. He got saved by the rebels and got cured. He tells you about his story and seems sorry about what he did, even though he doesn't remember anything as he was almost turning cyberpsycho. The player has the option to start a fight directly or to talk to him. The player can still choose to fight Grim during the discussion.`,
        isParent: false
      },
      {
        id: 'story-v-city',
        title: 'Welcome to V-city',
        content: `From here the player will either have to complete quests from the rebels if he joins them or he can just wander around and do side quests or just fight with the different factions of the game. Considering the gameplay outside of the rebels path should still be interesting and rewarding, the player will have the opportunity to become a mercenary for different corporations or as a private. Each mercenary quest will give the player rewards same as the rebels quest. They will all be different so that both options (joining or not the rebels) will result in a different type of fighting gameplay.`,
        isParent: false
      },
      {
        id: 'story-fight-with-z',
        title: 'The Fight with Z',
        content: `This section is separated between the path where you chose to join the rebels or not. 
The rebellion is ready. 
From here you've accomplished many quests for the rebels. You have a high grade and really good equipment. The rebels are ready to start the assault against Z's tower. The fight is hard. You have to beat all of the guards with your crew, many NPC that you might have bound to die. At this point you get to Z and start the fight with him. 

The big contract. 
As a mercenary you get offered a contract where you have to kill Z. You can refuse the contract to have a path where you ignore Z. If you accept, you get a call from him. If you choose to kill Grim, Z will offer to join him. Accepting to join Z will result in the lowest honor ending of the game (The corpo sellout). The player can also just not answer the call or insult him or even be nonchalant about it as he's just a contract. Depending on the choices during the game, the fight will be more or less hard. If you lose the fight against him, Z will insert the soul killer into your neural port, trapping your soul into a relic forever. If you win the fight he tries to offer you a very good position in his company. The player can accept and get the low honor ending or he can give him the final strike.`,
        isParent: false
      },
      {
        id: 'story-ending',
        title: 'It\'s Done',
        content: `Same as the fight with Z, this section will be separated into different sections depending on if you've joined the rebels or not. 
The free city. 
You fought with the rebels and won. The rebels now have control of the building and get access to everything about it. Confidential information involving different other corporations then gets leaked and the whole city starts to join the rebels, leaving V-city to the hands of its population and democracy comes back. 

Contract done. 
The point of the contract was not only to kill Z but also to erase all the proof involving some other company into weird business. The following choice is to either execute the contract and erase everything or leave the city a chance by leaving all the evidence for the rebels to find. This will only work if you havent had to kill all the rebels of course. You now have tons shit of money and equipment. You can decide to do anything you want as no one can stop you anymore. You can either find a challenge in the optional bosses of the game or leave the city and fight endlessly against all the cyber psycho outside of it.`,
        isParent: false
      }
    ]
  },
  {
    id: 'endings',
    title: 'Endings',
    content: `1. The Corpo Sellout 
-	Conditions: Don't Side with the Rebels, Kill Grim, Side with Z. 
-	Outcome: Z rewards you with a high-ranking corpo position, but you become a pawn in his empire. The city remains oppressed, and you lose your humanity. 

2. The Rebel Leader 
-	Conditions: Side with the Rebels, Spare Grim, kill Z. 
-	Outcome: You lead a revolution against the corpos. The city is freed, democracy is back and a bright future can be seen. 

3. The Lone Wolf 
-	Conditions: don't side with the rebels, kill Grim Fang, ignore Z. 
-	Outcome: The rebels start a huge battle and most of them die to the corpo forces. You become a wanderer mercenary with no honor. The last rebels standing push you out of the city, leaving you in an endless desert outside the city where all you can do is fight against all the unwelcoming cyberpsychos there. 

4. The Sacrificial Hero 
-	Conditions: Side with the rebels, sparing Grim Fang, try to kill Z but lose. 
-	Outcome: You lose your fight with Z, but Grim Fang comes out of nowhere surprisingly stabbing Z leaving you the opportunity to finally rip Z's head off but Z escapes at that right moment and your blade decapitates Grim's head. Though the rage almost turns you psycho, a second fight starts where your abilities are multiplied by 2, granting you an easy win.   

5. The Cyberpsycho 
-	Conditions: Overuse cybernetic upgrades. 
-	Outcome: You become a cyberpsycho, you can't interact with anyone or it'll start a fight where you can't control yourself. Your only choice is to kill everyone and maybe even kill Z. 

6. The unexpected savior 
-	Conditions : Don't join the rebels, spare Grim Fang, kill Z 
-	Outcome: As mercenary, you get a contract to kill Z. You go there and find out that the rebels are trying to infiltrate the building. They are in a difficult position as they're all dying. But since you have a contract to accomplish you help them and kill Z while they fight the guards. They are grateful. 

7. The hated 
-	Conditions : Don't join the rebels, kill Grim Fang, kill Z 
-	Outcome: As mercenary, you get a contract to kill Z. You go there and find out that the rebels are trying to infiltrate the building. They are in a difficult position as they're all dying. When you get there a group of rebels recognize you and try to kill you. You defend yourself and end up having to kill all of them. And then you still have to fight with all the guards and then kill grim. This is the most difficult end.`,
    isParent: false
  },
  {
    id: 'characters',
    title: 'Characters',
    content: '',
    isParent: true,
    children: [
      {
        id: 'characters-main',
        title: 'Main Characters',
        content: `- The player

- Z : The mega corpo boss. He has 3 eyes on the left side of his face. (inspiration : Faraday from Cyberpunk Edgerunner) 

- Drake Vortex : The best ripperdoc in town. He'll be the one that fixes the player at the beginning of the game and he'll be the one to see to spend XP points to get upgrades.  

- Rogue hex : The leader of the rebels. Fiercely independent, she trusts no one but expects absolute loyalty from those who follow her.`,
        isParent: false
      },
      {
        id: 'characters-side',
        title: 'Side Characters',
        content: `- Grim Fang : He is the guy that leaves you with a missing leg and a missing arm. He is a homeless cannibal who got consumed by the society and mego corporation. He used to be employed by Z. [Story to be written]. One of the player's choices to guide him through the ending will be to kill Grim or not. 

- Von Beber:  
A former train driver turned mad by the recurring suicides in the city metro. He fell into synthetic drug addiction, is very mentally unstable and can either be a friend or a foe to the main character depending on his choices. 

- Anti-brodu : He is a washed-up ex-hacker, paranoid and always on edge, but his parrot is the real mastermind. Fitted with a neural uplink and a modified voice synthesizer, the parrot is an elite-level hacker, capable of infiltrating even the most secure networks. Anti-brodu treats him like an old war buddy, constantly arguing with the bird as if they were equals. Whether they help or betray the player depends on how much trust they have in them.  

- Queen Karen : Has perfected the use of ancient hacking technologies. He became a lone wolf refusing to use the newer technology and never got augmented. He developed cancer and lost his mind. He can give very useful hacking techniques to the player.`,
        isParent: false
      },
      {
        id: 'optional-bosses',
        title: 'Optional Bosses',
        content: `- Subject 0 : An ex bodyguard so augmented that he's basically a cyborg now. During the fight against him he'll have 2 phases. When going to the second phase, the boss will develop cyberpsychosis and will totally lose control, becoming basically invincible. His backstory is that he was employed and then forcely augmented by his both to become the strongest bodyguard but ended up killing his boss to become a lonely mercenary. (inspiration : Adam Smasher from Cyberpunk2077) 

- Halycon-Void : A former military tactician whose mind was forcibly transferred into an advanced combat AI. He retains his genius-level strategy but has lost all emotion. His first phase is all about calculated precision, predicting the player's moves and countering them. In phase two, an internal memory corruption forces him into an unpredictable, chaotic state where his attacks are randomized but devastating. 

- Mournstar: Once the most infamous bounty hunter in the underground, MOURNSTAR was betrayed by the megacorp that employed her and left for dead. Now, she exists only to hunt and kill those who stand in her way. Her first phase is a duel-like encounter where she analyzes the player's patterns. In phase two, she injects herself with a banned combat stimulant, making her reckless, ultra-fast, and immune to status effects. 

- Vulture : A cybernetic scavenger who preys on fallen warriors, absorbing their augments and skills. VULTURE-77 is unpredictable because his skillset depends on the enemies he has devoured before the fight. In phase one, he fights using the stolen techniques of past challengers. When entering phase two, he activates an emergency power surge that lets him use multiple stolen skills per turn, making him a nightmare to predict. 

- Zoren : A genetically enhanced soldier who volunteered to get experimental military-grade cybernetics. Now, his mind is barely human, operating on instinct and raw aggression. His first phase is a brutal but disciplined fight. When his cybernetic limiters break in phase two, he ignores all defensive tactics and prioritizes pure, overwhelming destruction, striking multiple times per turn with no regard for his own safety. 

- Kwerl : He is an old failed scientific experiment to mix human and animal genes. He became a failure as his mind started to be more animal and lost consciousness. He is addicted to virtual reality and becomes extremely aggressive when bothered.`,
        isParent: false
      }
    ]
  },
  {
    id: 'design',
    title: 'Game Design',
    content: `The game will be a hybrid 2D/3D RPG. Featuring 2D pixel art Character and items mixed with a 3D low poly PS1/PS2 style environment.  
The exploration part will be standard 3D movements. The fights are going to be standard RPG battle scenes turn by turn based.  
The whole thing will be very neon cyberpunk. Futuristic weapons, cybernetics upgrade etc.. 
A massive city populated by mega corporation controlling the whole city center. Massive tall building very neon. (Inspiration : Night city from Cyberpunk) 
An underground city very gotham vibe where no law applies. Murder at every corner. The outside of the city is a giant desert populated by crazy cyberpsycho.`,
    isParent: false
  },
  {
    id: 'development',
    title: 'Game Development',
    content: `- choosing the game engine
- Creating some first sprites for the character
- building a map 
- implementing the map in the engine
- implenting the character in the map
- Creating the datasheets for the quests and dialogues
- creating the scripted events`,
    isParent: false
  },
  {
    id: 'rating',
    title: 'Rating',
    content: 'ESRB 17+',
    isParent: false
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    content: `Synthetic Sacrifice is a 2D browser-based RPG set in a fractured cyberpunk world. Players begin as a limbless amnesiac, scavenging cybernetics to survive, with choices shaping seven distinct endings—from corporate allegiance to revolution. Gameplay blends click-based exploration, turn-based combat, and an XP-driven upgrade system across zones like a neon metropolis, lawless slums, and a desert wasteland. Moral ambiguity, branching narratives, and challenging bosses emphasize strategic decisions, while mature themes of violence and consequence anchor its gritty, replayable experience.`,
    isParent: false
  },
];

// Flatten sections for rendering
const flattenSections = (): Section[] => {
  const flattened: Section[] = [];
  mainSections.forEach(section => {
    flattened.push(section);
    if (section.isParent && section.children) {
      section.children.forEach(child => {
        flattened.push(child);
      });
    }
  });
  return flattened;
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const sectionRefs = useRef<Record<string, { current: HTMLElement | null }>>({});
  
  // Initialize section refs
  useEffect(() => {
    const flat = flattenSections();
    flat.forEach(section => {
      sectionRefs.current[section.id] = sectionRefs.current[section.id] || { current: null };
    });
  }, []);
  
  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  // Set up intersection observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80% 0px', // Only consider the top 20% of the viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Sort by Y position - we want the topmost section
        const sorted = visibleEntries.sort((a, b) => 
          a.boundingClientRect.top - b.boundingClientRect.top
        );
        
        setActiveSection(sorted[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section elements
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setDarkMode(theme === 'dark');
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Synthetic Sacrifice</h2>
          <ThemeSwitch onThemeChange={handleThemeChange} />
        </div>
        <nav className="sidebar-nav">
          {mainSections.map(section => (
            <div key={section.id}>
              <button 
                className={`nav-item ${activeSection === section.id ? 'active' : ''} ${section.isParent ? 'parent' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </button>
              
              {section.isParent && section.children && (
                <div className="sub-nav">
                  {section.children.map(child => (
                    <button 
                      key={child.id}
                      className={`nav-item sub-item ${activeSection === child.id ? 'active' : ''}`}
                      onClick={() => scrollToSection(child.id)}
                    >
                      {child.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <main className="content">
        {mainSections.map(section => (
          <div key={section.id}>
            <section 
              id={section.id} 
              className="content-section"
              ref={(el) => { sectionRefs.current[section.id] = { current: el }; }}
            >
              <h1>{section.title}</h1>
              {!section.isParent && (
                <div className="section-content">
                  {section.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
                  ))}
                </div>
              )}
            </section>
            
            {section.isParent && section.children && section.children.map(child => (
              <section 
                key={child.id} 
                id={child.id} 
                className="content-section child-section"
                ref={(el) => { sectionRefs.current[child.id] = { current: el }; }}
              >
                <h2>{child.title}</h2>
                <div className="section-content">
                  {child.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ))}
        
        <footer className="footer">
          © {new Date().getFullYear()} Synthetic Sacrifice. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

export default App
