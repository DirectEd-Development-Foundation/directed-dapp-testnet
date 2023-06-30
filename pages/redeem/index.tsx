import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState } from "react";
import type { NextPage } from "next";
import { Transaction, KoiosProvider, resolveDataHash } from '@meshsdk/core';
import { Layout } from '../../components';

const Redeem: NextPage = () => {
    const { wallet, connected, connecting } = useWallet();
    const [loading, setLoading] = useState<boolean>(false);

    console.log('wallet:', wallet);
    console.log('connected:', connected);
    console.log('connecting:', connecting);

    const lockFunds = async () => {
        if (wallet) {
            const scriptAddress = 'addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8';

            const tx = new Transaction({ initiator: wallet })
                .sendAssets(
                    {
                        address: scriptAddress,
                        datum: {
                            value: 'supersecret',
                        },
                    },
                    [
                        {
                            unit: "a1deebd26b685e6799218f60e2cad0a80928c4145d12f1bf49aebab554657374546f6b656e",
                            quantity: "1",
                        },
                    ],
                );

            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);
        }
    };

    const unlockFunds = async () => {
        if (wallet) {
            setLoading(true);

            console.log('wallet:', wallet);

            const scriptAddress = 'addr_test1wqm0h0putljr4umj86fw6dpatfatwjk8h70y05q9yf5fz6s6af6m8';
            const asset = '9772ff715b691c0444f333ba1db93b055c0864bec48fff92d1f2a7feDjed_testMicroUSD446a65645f746573744d6963726f555344';
            const datum = 'supersecret';

            const koios = new KoiosProvider('preprod');

            const utxos = await koios.fetchAddressUTxOs(scriptAddress, asset);
            const dataHash = resolveDataHash(datum);

            const assetUtxo = utxos.find((utxo: any) => utxo.output.dataHash === dataHash);

            const address = await wallet.getChangeAddress();

            const tx = new Transaction({ initiator: wallet })
                .redeemValue({
                    value: assetUtxo,
                    script: {
                        version: 'V1',
                        code: '5903b25903af01000032323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232322225333573466600890000010008a4c2c444646464646464646464646464664a666ae68cdc3800a400024660826608000c01000824940d55ce9baa00100100d33303a00122323303c00300133036303500100b375090002980d8051981918189811800803a980d80419981b00091191981c0018009981918188008031ba848000cc0a80048c8cc94ccd5cd19b870014800048c8cc06cc0680054c07402cc0d800449281aab9d37540020026026002604800260440086601800e00c66016002a6012601092104444a4544003006530083007491386663383065366634393731373033393961333032666133396666326134643638373163376465343130383265363331353664653339336237004c01024101004c011e581ca1deebd26b685e6799218f60e2cad0a80928c4145d12f1bf49aebab500013237526e600048c84dd49b980013002001237326eb800488cdd2a4000660060040024466ae80008c00c0048cd5d000080e00091aba1300200123574460280020120464264646602c00246464a666ae68cdc39aab9d00148000528099baf357426aae78004014dd5000980b180a80098081807801298010009098061805180918089804a980100090991980318029806801119baf300500100253002001213019301700101701623223330050020010043758002400244464666002002008006444a666aae7c0085854ccd5cd18009aba1002130043574200426660060066ae880080040408cc0080052002225333573466e1cd55ce9baa00200110021600f00e001235742600400246ae88c02c0040280248c88dd3998020010009bac00122333004002001003376293111191998008008020019112999aab9f002100415333573460026ae840084cd5d01aba10023330030033574400400226660060066ae8800800400888ccc888cc88ccc0080080040148894ccd55cf80089ba84800054ccd5cd19baf35573a6ae840040144cc008008dd59aab9e3574200226660060060046ae88004894ccd55cf80089ba84800054ccd5cd19baf35573a6ae8400400c4d55cf1aba1001133002002357440026eac008c014004c00c0048d5d0980100091aba23003001235742600400246aae78dd5000911ba8337006eb4008dd6800919111998028018010009bac001222323333001001004003002222253335573e0062002266660080086ae8800c008cc008004d5d0801911ba8337026eb4008dd6800800baf1',
                    },
                    datum: datum,
                })
                .sendValue(address, assetUtxo)
                .setRequiredSigners([address]);

            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx, true);
            const txHash = await wallet.submitTx(signedTx);

            setLoading(false);

        }
    };

    return (
        <div>
            <h1>Connect Wallet</h1>
            <CardanoWallet />
            {connected && (
                <>
                    <div>
                        <h1>Lock funds in your Contract</h1>
                        <button
                            type="button"
                            onClick={() => lockFunds()}
                            disabled={connecting || loading}
                            className="lock-funds-button"
                        >
                            Lock funds
                        </button>

                    </div>

                    <div>
                        <h1>Unlock your funds from your Contract</h1>
                        <button
                            type="button"
                            onClick={() => unlockFunds()}
                            disabled={connecting || loading}
                            className="unlock-funds-button"
                        >
                            Unlock funds
                        </button>

                    </div>
                </>
            )}
        </div>
    );
};

export default Redeem;
