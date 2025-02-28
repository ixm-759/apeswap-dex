import React, { useContext } from 'react'
import { Menu as UikitMenu, ConnectorId } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import { useGetPriceDataFromLP } from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'
import links from './config'

const Menu: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  // const priceData = useGetPriceData()
  // const cakePriceUsd = priceData ? Number(priceData.prices.Cake) : undefined
  const lpPrice = useGetPriceDataFromLP();

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={(connectorId: ConnectorId) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      setLang={setSelectedLanguage}
      cakePriceUsd={lpPrice}
      {...props}
    />
  )
}

export default Menu
