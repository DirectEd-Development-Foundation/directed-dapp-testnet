import { useState } from 'react';
import { useRouter } from 'next/router';
import * as L from "lucid-cardano";
import { Button, Layout, Meta } from '../../../components';
import { checkSchoolCredentials } from '../../api/lucid/pkh';
import { mintStudentToken } from '../../api/lucid/functions';


const school = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const handleWalletAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleLucid = async () => {
    console.log(`User ${address} tokens`);
    const lucid = await L.Lucid.new();
    const api = await window.cardano.eternl.enable();
    lucid.selectWallet(api);
    const authaddress = await lucid.wallet.address();
    const details = await lucid.utils.getAddressDetails(authaddress);
    const pkh = details.paymentCredential.hash;
    const isTrue = checkSchoolCredentials(pkh);
    if(isTrue) {
      const tx = await mintStudentToken(address);
      console.log(tx)
    }
    // Redirect to another page after minting (e.g., a success page)
    // router.push('/mint-success');
  }

  return (
    <Layout>
      <Meta
        title="School Page"
        description="Welcome, Authority! Enter the authority address below to mint the required token."
      />
      <div className="school-page">
        <h1>Welcome, School!</h1>
        <p>Mint the required tokens by entering the School address  below:</p>
        <input
          type="text"
          placeholder="Enter school address"
          value={address}
          onChange={handleWalletAddress}
        />
        <div className="school-page__buttons">
          <Button variant="primary" onClick={handleLucid} disabled={!address}>
            Mint Tokens
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default school;
