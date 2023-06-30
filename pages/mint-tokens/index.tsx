import { useState } from 'react';
import { Transaction } from '@meshsdk/core';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { AssetMetadata, Mint, Action, PlutusScript } from '@meshsdk/core';

interface MintingFormValues {
    assetName: string;
    assetQuantity: string;
    assetImage: string;
    mediaType: string;
    assetDescription: string;
}

const MintTokens: React.FC = () => {
    const { wallet, connected, connecting } = useWallet();
    const [formValues, setFormValues] = useState<MintingFormValues>({
        assetName: '',
        assetQuantity: '',
        assetImage: '',
        mediaType: '',
        assetDescription: '',
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { assetName, assetQuantity, assetImage, mediaType, assetDescription } =
            formValues;

        const assetMetadata: AssetMetadata = {
            name: assetName,
            image: assetImage,
            mediaType: mediaType,
            description: assetDescription,
        };

        const asset: Mint = {
            assetName: assetName,
            assetQuantity: assetQuantity,
            metadata: assetMetadata,
            label: '721',
            recipient: 'addr_test1qrslkfkz3en2s94tyar92xh4eyn9srlh2kys3y79cxfcpdf0vdjfc5kdxrc5vfgtggq7xcj0td4vxz7hlledc5nqxwvqkfr34k',
        };

        const script: PlutusScript = {
            code: '5907655907620100003232323232323232323232323232332232323232322232325335320193333573466e1cd55cea80124000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd4050054d5d0a80619a80a00a9aba1500b33501401635742a014666aa030eb9405cd5d0a804999aa80c3ae501735742a01066a02803e6ae85401cccd54060081d69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd40a9d69aba15002302b357426ae8940088c98c80b4cd5ce01701681589aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a8153ad35742a00460566ae84d5d1280111931901699ab9c02e02d02b135573ca00226ea8004d5d09aba2500223263202933573805405204e26aae7940044dd50009aba1500533501475c6ae854010ccd540600708004d5d0a801999aa80c3ae200135742a004603c6ae84d5d1280111931901299ab9c026025023135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a004601c6ae84d5d1280111931900b99ab9c018017015101613263201633573892010350543500016135573ca00226ea800448c88c008dd6000990009aa80a911999aab9f0012500a233500930043574200460066ae880080508c8c8cccd5cd19b8735573aa004900011991091980080180118061aba150023005357426ae8940088c98c8050cd5ce00a80a00909aab9e5001137540024646464646666ae68cdc39aab9d5004480008cccc888848cccc00401401000c008c8c8c8cccd5cd19b8735573aa0049000119910919800801801180a9aba1500233500f014357426ae8940088c98c8064cd5ce00d00c80b89aab9e5001137540026ae854010ccd54021d728039aba150033232323333573466e1d4005200423212223002004357426aae79400c8cccd5cd19b875002480088c84888c004010dd71aba135573ca00846666ae68cdc3a801a400042444006464c6403666ae7007006c06406005c4d55cea80089baa00135742a00466a016eb8d5d09aba2500223263201533573802c02a02626ae8940044d5d1280089aab9e500113754002266aa002eb9d6889119118011bab00132001355012223233335573e0044a010466a00e66442466002006004600c6aae754008c014d55cf280118021aba200301213574200222440042442446600200800624464646666ae68cdc3a800a40004642446004006600a6ae84d55cf280191999ab9a3370ea0049001109100091931900819ab9c01101000e00d135573aa00226ea80048c8c8cccd5cd19b875001480188c848888c010014c01cd5d09aab9e500323333573466e1d400920042321222230020053009357426aae7940108cccd5cd19b875003480088c848888c004014c01cd5d09aab9e500523333573466e1d40112000232122223003005375c6ae84d55cf280311931900819ab9c01101000e00d00c00b135573aa00226ea80048c8c8cccd5cd19b8735573aa004900011991091980080180118029aba15002375a6ae84d5d1280111931900619ab9c00d00c00a135573ca00226ea80048c8cccd5cd19b8735573aa002900011bae357426aae7940088c98c8028cd5ce00580500409baa001232323232323333573466e1d4005200c21222222200323333573466e1d4009200a21222222200423333573466e1d400d2008233221222222233001009008375c6ae854014dd69aba135744a00a46666ae68cdc3a8022400c4664424444444660040120106eb8d5d0a8039bae357426ae89401c8cccd5cd19b875005480108cc8848888888cc018024020c030d5d0a8049bae357426ae8940248cccd5cd19b875006480088c848888888c01c020c034d5d09aab9e500b23333573466e1d401d2000232122222223005008300e357426aae7940308c98c804ccd5ce00a00980880800780700680600589aab9d5004135573ca00626aae7940084d55cf280089baa0012323232323333573466e1d400520022333222122333001005004003375a6ae854010dd69aba15003375a6ae84d5d1280191999ab9a3370ea0049000119091180100198041aba135573ca00c464c6401866ae700340300280244d55cea80189aba25001135573ca00226ea80048c8c8cccd5cd19b875001480088c8488c00400cdd71aba135573ca00646666ae68cdc3a8012400046424460040066eb8d5d09aab9e500423263200933573801401200e00c26aae7540044dd500089119191999ab9a3370ea00290021091100091999ab9a3370ea00490011190911180180218031aba135573ca00846666ae68cdc3a801a400042444004464c6401466ae7002c02802001c0184d55cea80089baa0012323333573466e1d40052002200723333573466e1d40092000212200123263200633573800e00c00800626aae74dd5000a4c2400292010350543100122002112323001001223300330020020011',
            version: 'V2',
        };

        const redeemer: Partial<Action> = {
            tag: 'MINT',
        };

        const tx = new Transaction({ initiator: wallet });

        // Perform the minting logic here (using mesh as a reference)
        tx.mintAsset(script, asset, redeemer);

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);

        // Reset the form
        setFormValues({
            assetName: '',
            assetQuantity: '',
            assetImage: '',
            mediaType: '',
            assetDescription: '',
        });
    };

    return (
        <div>
            <h1>Connect Wallet</h1>
            <CardanoWallet />
            {connected && (
            <>
                <h1>Minting Component UI</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="assetName">Asset Name:</label>
                    <input
                        type="text"
                        id="assetName"
                        name="assetName"
                        value={formValues.assetName}
                        onChange={handleInputChange}
                        required
                    /><br />

                    <label htmlFor="assetQuantity">Asset Quantity:</label>
                    <input
                        type="text"
                        id="assetQuantity"
                        name="assetQuantity"
                        value={formValues.assetQuantity}
                        onChange={handleInputChange}
                        required
                    /><br />

                    <label htmlFor="assetImage">Asset Image URL:</label>
                    <input
                        type="text"
                        id="assetImage"
                        name="assetImage"
                        value={formValues.assetImage}
                        onChange={handleInputChange}
                        required
                    /><br />

                    <label htmlFor="mediaType">Media Type:</label>
                    <input
                        type="text"
                        id="mediaType"
                        name="mediaType"
                        value={formValues.mediaType}
                        onChange={handleInputChange}
                        required
                    /><br />

                    <label htmlFor="assetDescription">Asset Description:</label>
                    <textarea
                        id="assetDescription"
                        name="assetDescription"
                        value={formValues.assetDescription}
                        onChange={handleInputChange}
                        required
                    ></textarea><br />

                    <button type="submit">Mint Asset</button>
                </form>
            </>
            )}
        </div>
    );
};

export default MintTokens;
