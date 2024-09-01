import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye, Trash2 } from "lucide-react"
import {useState} from "react";

// Sample data for the table


export default function ApplicationsTable() {
    const [applications, setApplications] = useState([])

    // Function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString()
    }

    return (
        <Table>
            <TableHeader className={'bg-yellow-100'}>
                <TableRow>
                    <TableHead className={'min-w-max whitespace-nowrap'}>ID</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Name</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Father's Name</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Document Type</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Document Number</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Mobile</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Address</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Address1</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Residence Type</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Occupation</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Category</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Email</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Front Photo</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Back Photo</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Photo</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Status</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Initiated At</TableHead>
                    <TableHead className={'min-w-max whitespace-nowrap'}>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications && applications.length > 0 ? applications.map((application:any) => (
                    <TableRow key={application.id}>
                        <TableCell>{application.id}</TableCell>
                        <TableCell>{application.name}</TableCell>
                        <TableCell>{application.fatherName}</TableCell>
                        <TableCell>{application.documentType}</TableCell>
                        <TableCell>{application.documentNumber}</TableCell>
                        <TableCell>{application.mobile}</TableCell>
                        <TableCell>{application.address}</TableCell>
                        <TableCell>{application.address1}</TableCell>
                        <TableCell>{application.residenceType}</TableCell>
                        <TableCell>{application.occupation}</TableCell>
                        <TableCell>{application.category}</TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>
                            <img src={application.frontPhoto} alt="Front Photo" className="h-10 w-10" />
                        </TableCell>
                        <TableCell>
                            <img src={application.backPhoto} alt="Back Photo" className="h-10 w-10" />
                        </TableCell>
                        <TableCell>
                            <img src={application.photo} alt="Photo" className="h-10 w-10" />
                        </TableCell>
                        <TableCell>{application.status}</TableCell>
                        <TableCell>{formatDate(application.createdAt)}</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ) ) : <TableRow >
                    <TableCell colSpan={12}>
                        No Applications found
                    </TableCell>
                   </TableRow>}
            </TableBody>
        </Table>

    )
}
