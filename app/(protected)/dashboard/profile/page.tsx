import FormContainer from '@/components/dashboard/FormContainer'
import Heading from '@/components/dashboard/Heading'
import ProfileForm from '@/components/dashboard/Profile/ProfileForm'
import { Profile } from '@/models/profile'
import { connect } from '@/utils/connect'

const GetProfileInformation = async () => {
    try {
        await connect()
        const data = await Profile.find()
        return data
    } catch (error) {
        throw new Error("Error occured while fetching data")
    }
}

export default async function ProfilePage() {

    return (
        <div>
            <Heading
                title='Profile Information'
            />
            <FormContainer>
                <ProfileForm />
            </FormContainer>
        </div>
    )
}
