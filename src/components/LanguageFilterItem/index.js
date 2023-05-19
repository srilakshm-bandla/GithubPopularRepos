// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, isActive, updateActiveLanguageFilter} = props

  const {id, language} = itemDetails

  const btnClassName = isActive ? 'filter-button-active' : 'filter-button'

  const onClickLanguageFilter = () => {
    console.log(id)
    updateActiveLanguageFilter(id)
  }

  return (
    <li className="language-list-item">
      <button
        type="button"
        className={btnClassName}
        onClick={onClickLanguageFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
