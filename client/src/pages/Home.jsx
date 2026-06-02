import { Link } from 'react-router-dom'

const exercises = [
  {
    num: 'Exercice 1',
    path: '/exercice1',
    title: 'Somme de deux variables',
    desc: 'Fonctions view et pure pour calculer la somme de deux nombres entiers.',
    icon: '➕',
  },
  {
    num: 'Exercice 2',
    path: '/exercice2',
    title: 'Conversion des cryptomonnaies',
    desc: 'Convertir des montants entre Ether et Wei avec des fonctions pure.',
    icon: '💱',
  },
  {
    num: 'Exercice 3',
    path: '/exercice3',
    title: 'Traitement des chaînes de caractères',
    desc: 'Gestion de strings : set/get, concaténation, longueur, comparaison.',
    icon: '🔤',
  },
  {
    num: 'Exercice 4',
    path: '/exercice4',
    title: 'Tester le signe d\'un nombre',
    desc: 'Vérifier si un entier signé est positif, négatif ou nul.',
    icon: '±',
  },
  {
    num: 'Exercice 5',
    path: '/exercice5',
    title: 'Parité d\'un nombre',
    desc: 'Vérifier si un entier est pair ou impair.',
    icon: '🔢',
  },
  {
    num: 'Exercice 6',
    path: '/exercice6',
    title: 'Gestion des tableaux',
    desc: 'Tableau dynamique : ajout, accès, affichage et calcul de somme.',
    icon: '📊',
  },
  {
    num: 'Exercice 7',
    path: '/exercice7',
    title: 'Programmation Orientée Objet',
    desc: 'Contrat abstrait Forme et contrat concret Rectangle avec héritage.',
    icon: '📐',
  },
  {
    num: 'Exercice 8',
    path: '/exercice8',
    title: 'Variables globales msg.sender & msg.value',
    desc: 'Contrat Payment : réception d\'Ethers et retrait sécurisé.',
    icon: '💸',
  },
]

export default function Home() {
  return (
    <>
      <h1 className="page-title">Choisissez un exercice</h1>
      <div className="home-grid">
        {exercises.map((ex) => (
          <Link key={ex.path} to={ex.path} className="exercise-card" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="num">{ex.num}</span>
              <span style={{ fontSize: '1.8rem' }}>{ex.icon}</span>
            </div>
            <h3>{ex.title}</h3>
            <p>{ex.desc}</p>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>
    </>
  )
}
