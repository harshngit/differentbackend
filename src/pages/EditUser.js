import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import Topbar from '../components/Layout/Topbar'
import UserForm from '../CreateUser/UserForm'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '../firebase.config'
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { getDownloadURL, uploadBytesResumable, ref as storageRef } from 'firebase/storage'
import * as XLSX from 'xlsx';
import EditUserForm from '../CreateUser/EditUserForm'
const EditUser = () => {
  const navigate = useNavigate("")
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [gstNo, setGstNo] = useState("")
  const [gstDocument, setGstDocument] = useState("")
  const [agreement, setAgreement] = useState("")
  const [otherDoc, setOtherDoc] = useState("")
  const [insuranceType, setInsuranceType] = useState("")
  const [contact, setContact] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [rateChart, setRateChart] = useState(null)
  const [rateJson, setRateJson] = useState("")
  const handleCreateUser = async () => {

    await updateDoc(doc(db, "users", id), {
      name: name,
      email: email,
      password: password,
      contact: contact,
      companyName: companyName,
      gstNo: gstNo,
      gstDocument: gstDocument,
      agreement: agreement,
      otherDoc: otherDoc,
      insuranceType: insuranceType,
      companyAddress: companyAddress,
      walletBalance: "",
      rateList: rateJson
    })
    navigate("/users")

  }
  const addGSTInformation = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storeRef = storageRef(storage, `invoices/${file.name}`);
    const uploadTask = uploadBytesResumable(storeRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setGstDocument(downloadURL)
          console.log(downloadURL)
        });
      }
    );
  }
  const addAgreementInformation = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storeRef = storageRef(storage, `invoices/${file.name}`);
    const uploadTask = uploadBytesResumable(storeRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAgreement(downloadURL)
          console.log(downloadURL)
        });
      }
    );
  }
  const handleConvert = () => {
    if (rateChart) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setRateJson(json);

      };

      reader.readAsBinaryString(rateChart);
      alert("Updated Rate List")
    }

  }

  const fetchUser = () => {
    onSnapshot(doc(db, "users", id), (doc) => {
      const data = doc.data()
      setUserInfo(data)
      setName(data?.name)
      setEmail(data?.email)
      setRateJson(data?.rateList)
      setContact(data?.contact)
      setCompanyName(data?.companyName)
      setCompanyAddress(data?.companyAddress)
      setGstNo(data?.gstNo)
      setGstDocument(data?.gstDocument)
      setInsuranceType(data?.insuranceType)
      setAgreement(data?.agreement)
      setOtherDoc(data?.otherDoc)
      setPassword(data?.password)
    });
  }
  useEffect(() => {
    fetchUser()
  }, [id])

  return (
    <div className='bg-gray-100 flex '>
      <Sidebar />
      <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col '  >
        <Topbar />

        <EditUserForm name={name} setName={setName}
          rateChart={rateChart} setRateChart={setRateChart}
          rateJson={rateJson} setRateJson={setRateJson}
          handleConvert={handleConvert}
          addAgreementInformation={addAgreementInformation}
          addGSTInformation={addGSTInformation}
          handleCreateUser={handleCreateUser}
          companyAddress={companyAddress} setCompanyAddress={setCompanyAddress}
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          companyName={companyName} setCompanyName={setCompanyName}
          gstNo={gstNo} setGstNo={setGstNo}
          agreement={agreement} setAgreement={setAgreement}
          gstDocument={gstDocument} setGstDocument={setGstDocument}
          otherDoc={otherDoc} setOtherDoc={setOtherDoc}
          insuranceType={insuranceType} setInsuranceType={setInsuranceType}
          contact={contact} setContact={setContact}
        />
      </div>
    </div>
  )
}

export default EditUser