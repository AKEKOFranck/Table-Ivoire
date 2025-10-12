import '../styles/Like.css';
import { useState, useEffect } from 'react';

export default function Like({ itemId }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // null, 'like' ou 'dislike'

  // Charger les réactions au montage du composant
  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes_${itemId}`);
    const savedDislikes = localStorage.getItem(`dislikes_${itemId}`);
    const userReaction = localStorage.getItem(`userReaction_${itemId}`);
    
    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedDislikes) setDislikes(parseInt(savedDislikes));
    if (userReaction) setUserReaction(userReaction);
  }, [itemId]);

  const handleLike = () => {
    if (userReaction === 'like') {
      // Retirer le like
      const newLikes = likes - 1;
      setLikes(newLikes);
      setUserReaction(null);
      localStorage.setItem(`likes_${itemId}`, newLikes.toString());
      localStorage.removeItem(`userReaction_${itemId}`);
    } else {
      // Ajouter un like
      const newLikes = likes + 1;
      
      // Si l'utilisateur avait déjà disliké, retirer le dislike
      let newDislikes = dislikes;
      if (userReaction === 'dislike') {
        newDislikes = dislikes - 1;
        setDislikes(newDislikes);
        localStorage.setItem(`dislikes_${itemId}`, newDislikes.toString());
      }
      
      setLikes(newLikes);
      setUserReaction('like');
      
      localStorage.setItem(`likes_${itemId}`, newLikes.toString());
      localStorage.setItem(`userReaction_${itemId}`, 'like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      // Retirer le dislike
      const newDislikes = dislikes - 1;
      setDislikes(newDislikes);
      setUserReaction(null);
      localStorage.setItem(`dislikes_${itemId}`, newDislikes.toString());
      localStorage.removeItem(`userReaction_${itemId}`);
    } else {
      // Ajouter un dislike
      const newDislikes = dislikes + 1;
      
      // Si l'utilisateur avait déjà liké, retirer le like
      let newLikes = likes;
      if (userReaction === 'like') {
        newLikes = likes - 1;
        setLikes(newLikes);
        localStorage.setItem(`likes_${itemId}`, newLikes.toString());
      }
      
      setDislikes(newDislikes);
      setUserReaction('dislike');
      
      localStorage.setItem(`dislikes_${itemId}`, newDislikes.toString());
      localStorage.setItem(`userReaction_${itemId}`, 'dislike');
    }
  };

  return (
    <section className='main'>
        
        <h2 className='main_title1'>Le site vous a-t-il été utile ?</h2>

      <div className="reaction-buttons">
        <div className="button-group">
          <button 
            onClick={handleLike} 
            className={`like-btn ${userReaction === 'like' ? 'active' : ''}`}
          >
            {userReaction === 'like' ? '👍' : '👍'} J'aime
          </button>
          <span className="count">{likes}</span>
        </div>
        
        <div className="button-group">
          <button 
            onClick={handleDislike} 
            className={`dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
          >
            {userReaction === 'dislike' ? '👎' : '👎'} Je n'aime pas
          </button>
          <span className="count">{dislikes}</span>
        </div>
      </div>

       <h3 className='main_title2'> Aidez-nous à améliorer nos services 
                <p> en répondant à ce court sondage.  </p>
            </h3>
    </section>
  );
}