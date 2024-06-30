import {useTranslation} from "next-i18next";
import {Image} from "@nextui-org/react";
import SupportCryptoBlock from "./image";

interface SupportProjectProps {
}

const SupportTheProject = (_: SupportProjectProps) => {
    const {t} = useTranslation()

    return (
        <div className="text-center mx-12 md:mx-36 m-auto" id="support-project-container">
            <h2 className="text-3xl lg:text-4xl mt-4 lg:mt-4 font-bold mb-8 text-white">{`${t('common.support_the_project')}`}</h2>

            <div className="grid content-center grid-cols-2 md:grid-cols-4 justify-items-center gap-y-4 gap-x-12 md:gap-x-48 md:gap-y-6">
                <SupportCryptoBlock
                    title={t('common.support_usdt_erc_20_wallet')}
                    src="/images/crypto/usdt_erc_20_wallet.png"
                    link={t('common.support_usdt_erc_20_link')}
                    address={t('common.support_usdt_erc_20_address')}
                />
                <SupportCryptoBlock
                    title={t('common.support_usdt_arb_wallet')}
                    src="/images/crypto/usdt_arb_wallet.png"
                    link={t('common.support_usdt_arb_link')}
                    address={t('common.support_usdt_arb_address')}
                />
                <SupportCryptoBlock
                    title={t('common.support_btc_wallet')}
                    src="/images/crypto/btc_wallet.png"
                    link={t('common.support_btc_link')}
                    address={t('common.support_btc_address')}
                />
                <SupportCryptoBlock
                    title={t('common.support_eth_wallet')}
                    src="/images/crypto/eth_wallet.png"
                    link={t('common.support_eth_link')}
                    address={t('common.support_eth_address')}
                />
                <SupportCryptoBlock
                    title={t('common.support_bnb_wallet')}
                    src="/images/crypto/bnb_wallet.png"
                    link={t('common.support_bnb_link')}
                    address={t('common.support_bnb_address')}
                />
                <SupportCryptoBlock
                    title={t('common.support_matic_wallet')}
                    src="/images/crypto/matic_wallet.png"
                    link={t('common.support_matic_link')}
                    address={t('common.support_matic_address')}
                />
                <SupportCryptoBlock
                    title={t('common.support_solana_wallet')}
                    src="/images/crypto/solana_wallet.png"
                    link={t('common.support_solana_link')}
                    address={t('common.support_solana_address')}
                />
                <SupportCryptoBlock
                    title={t('common.support_ton_wallet')}
                    src="/images/crypto/ton_wallet.png"
                    link={t('common.support_ton_link')}
                    address={t('common.support_ton_address')}
                />
            </div>
        </div>
    );
}

export default SupportTheProject