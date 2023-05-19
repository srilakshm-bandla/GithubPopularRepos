// Write your code here
import './index.css'

const starsIcon = 'https://assets.ccbp.in/frontend/react-js/stars-count-img.png'
const forksIcon = 'https://assets.ccbp.in/frontend/react-js/forks-count-img.png'
const openIssuesIcon =
  'https://assets.ccbp.in/frontend/react-js/issues-count-img.png '

const RepositoryItem = props => {
  const {repoData} = props

  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoData

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="repo-name" />
      <h1 className="repo-heading">{name}</h1>
      <div className="stats-container">
        <img src={starsIcon} alt="stars" className="stat-icons" />
        <p className="stats-count">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img src={forksIcon} alt="forks" className="stat-icons" />
        <p className="stats-count">{forksCount} forks</p>
      </div>

      <div className="stats-container">
        <img src={openIssuesIcon} alt="open issues" className="stat-icons" />
        <p className="stats-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
