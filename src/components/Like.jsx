import '../styles/Like.css';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Like({ itemId }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [user, setUser] = useState(null);
  const [userReaction, setUserReaction] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Auth et chargement des réactions
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadReactions(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [itemId]);

  const loadReactions = async (userId) => {
    if (!itemId) {
      setLoading(false);
      return;
    }
    
    try {
      const ref = doc(db, 'reactions', itemId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);

        // Vérifier la réaction de l'utilisateur
        if (data.usersLiked?.includes(userId)) {
          setUserReaction('like');
        } else if (data.usersDisliked?.includes(userId)) {
          setUserReaction('dislike');
        } else {
          setUserReaction(null);
        }
      } else {
        // Document n'existe pas encore
        setLikes(0);
        setDislikes(0);
        setUserReaction(null);
      }
    } catch (error) {
      console.error('Erreur de chargement Firestore :', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Like optimisé
  const handleLike = async () => {
    if (!user || !itemId || loading) return;

    setLoading(true);
    try {
      const ref = doc(db, 'reactions', itemId);
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : { likes: 0, dislikes: 0, usersLiked: [], usersDisliked: [] };

      let newLikes = data.likes || 0;
      let newDislikes = data.dislikes || 0;
      const currentUsersLiked = data.usersLiked || [];
      const currentUsersDisliked = data.usersDisliked || [];

      // Si l'utilisateur avait déjà disliké, on retire le dislike
      if (userReaction === 'dislike') {
        newDislikes = Math.max(0, newDislikes - 1);
      }

      // Gestion du like
      if (userReaction !== 'like') {
        // Ajouter le like
        newLikes += 1;
        setUserReaction('like');
        
        await updateDoc(ref, {
          likes: newLikes,
          dislikes: newDislikes,
          usersLiked: arrayUnion(user.uid),
          usersDisliked: userReaction === 'dislike' ? arrayRemove(user.uid) : currentUsersDisliked
        });
      } else {
        // Retirer le like
        newLikes = Math.max(0, newLikes - 1);
        setUserReaction(null);
        
        await updateDoc(ref, {
          likes: newLikes,
          usersLiked: arrayRemove(user.uid)
        });
      }

      setLikes(newLikes);
      setDislikes(newDislikes);

    } catch (error) {
      console.error('Erreur lors du Like :', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Dislike optimisé
  const handleDislike = async () => {
    if (!user || !itemId || loading) return;

    setLoading(true);
    try {
      const ref = doc(db, 'reactions', itemId);
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : { likes: 0, dislikes: 0, usersLiked: [], usersDisliked: [] };

      let newLikes = data.likes || 0;
      let newDislikes = data.dislikes || 0;
      const currentUsersLiked = data.usersLiked || [];
      const currentUsersDisliked = data.usersDisliked || [];

      // Si l'utilisateur avait déjà liké, on retire le like
      if (userReaction === 'like') {
        newLikes = Math.max(0, newLikes - 1);
      }

      // Gestion du dislike
      if (userReaction !== 'dislike') {
        // Ajouter le dislike
        newDislikes += 1;
        setUserReaction('dislike');
        
        await updateDoc(ref, {
          likes: newLikes,
          dislikes: newDislikes,
          usersDisliked: arrayUnion(user.uid),
          usersLiked: userReaction === 'like' ? arrayRemove(user.uid) : currentUsersLiked
        });
      } else {
        // Retirer le dislike
        newDislikes = Math.max(0, newDislikes - 1);
        setUserReaction(null);
        
        await updateDoc(ref, {
          dislikes: newDislikes,
          usersDisliked: arrayRemove(user.uid)
        });
      }

      setLikes(newLikes);
      setDislikes(newDislikes);

    } catch (error) {
      console.error('Erreur lors du Dislike :', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Chargement...</p>;

  return (
    <section className="like-section">
      <h2 className="like-title">Le site vous a-t-il été utile ?</h2>

      <div className="reaction-buttons">
        <button
          className={`like-btn ${userReaction === 'like' ? 'active' : ''}`}
          onClick={handleLike}
          disabled={!user || loading}
        >
          {userReaction === 'like' ? '👍 Liké' : '👍 J\'aime'}
        </button>
        <span className="count">{likes}</span>

        <button
          className={`dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
          onClick={handleDislike}
          disabled={!user || loading}
        >
          {userReaction === 'dislike' ? '👎 Disliké' : '👎 Je n\'aime pas'}
        </button>
        <span className="count">{dislikes}</span>
      </div>

      <p className="like-subtext">
        Aidez-nous à améliorer nos services en répondant à ce court sondage.
      </p>
    </section>
  );
}