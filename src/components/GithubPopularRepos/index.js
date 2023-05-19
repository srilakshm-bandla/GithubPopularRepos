import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageFilterId: languageFiltersData[0].id,
    repoData: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getRepoData()
  }

  updateActiveLanguageFilter = activeLanguageFilterId => {
    this.setState({activeLanguageFilterId}, this.getRepoData)
  }

  getRepoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeLanguageFilterId} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`

    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        repoData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul className="language-filter-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            itemDetails={eachItem}
            isActive={activeLanguageFilterId === eachItem.id}
            updateActiveLanguageFilter={this.updateActiveLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  renderRepositoriesListView = () => {
    const {repoData} = this.state
    /* console.log(repoData) */
    return (
      <ul className="repos-list">
        {repoData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoData={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return this.renderLoaderView()
    }
  }

  render() {
    return (
      <div className="github-popular-repo-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguageFilterList()}
        {this.renderContent()}
      </div>
    )
  }
}

export default GithubPopularRepos
