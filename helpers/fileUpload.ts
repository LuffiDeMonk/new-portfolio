import { storage } from "@/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const FileUpload = async (file: File, path: string) => {
    try {
        const fileRef = ref(storage, `${path}/${file.name}`)
        const bytes = await uploadBytes(fileRef, file)
        const url = await getDownloadURL(bytes.ref)
        return url
    } catch (error: any) {
        console.log(error)
    }

}

export default FileUpload