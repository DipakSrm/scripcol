import Account_List from '@/components/acc_list'
import { useAuth } from '../hooks/authenication';
import { useState, useEffect } from 'react';
import { database } from '@/utils/appwrite';
import { Query } from 'appwrite';
import Layout from '@/components/layout';
interface Model_Account {
    $id?: string;
    Name: string;
    BOID: string;
    AccountNumber: string;
    Email: string;
    PhoneNumber: string;
    ClientCode: string;
    Ref_Id?: string;
    Meroshare_Id: string;
}

export default function Accounts() {
    const { user, loading, signOut } = useAuth();
    const [data, setData] = useState<Model_Account[]>([]); // Declare data as an array of Model_Account

    useEffect(() => {
        if (user) {
            getdata();
        }
    }, [user]);

    const getdata = async () => {
        try {
            if (user) {
                const response: any = await database.listDocuments(
                    "64fb507e57d794c91f2f",
                    "650579d559b127c0998a",
                    [Query.equal("Ref_Id", [`${user.id}`]), Query.limit(100)]
                );
console.log(response,"tHIS IS RESPONSE")
                setData(response.documents); // Update the state with an array of Model_Account
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p className='loading'></p>;
    }

    return (
        <>
            <Layout>
                {data && <Account_List data={data} />}
            </Layout>
        </>
    )
}