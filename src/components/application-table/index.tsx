import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {AlertTriangleIcon, Eye, Trash2} from "lucide-react"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import Spinner from "@/molecules/spinner";

// Sample data for the table


export default function ApplicationsTable({applicationsData,refetchApplications}: any) {
    const [applications, setApplications] = useState([])
    const [deletingId, setDeletingId] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    // Function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString()
    }
    useEffect(() => {
        if (applicationsData) {

            console.log('app daata', applicationsData)
            setApplications(applicationsData)
        }
    }, [applicationsData]);

    const handleDelete = async (applicationId: string) => {

        try {
            setLoading(true)
            const response = await fetch(`/api/applications/${applicationId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                setLoading(false)
                throw new Error('Failed to delete application');
            }

            return await response.json();
        } catch (error) {
            setLoading(false)
            console.error('Error deleting application:', error);
            throw error;
        }
        finally {
            setLoading(false)
        }
    };
    const [open, setOpen] = useState(false)

    const handleDeleteConfirm = async () => {
        // Implement your delete logic here
        console.log("Application deleted")
        await handleDelete(deletingId)
        setOpen(false)
        refetchApplications()
    }
    if (loading) {

        return <Spinner/>
    }

    return (<>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangleIcon className="text-destructive"/>
                            Confirm Deletion
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this application? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                        >
                            Delete
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
                    {(applications && applications.length > 0) ? applications.map((application: any) => (
                        <TableRow key={application._id}>
                            <TableCell>{application._id}</TableCell>
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
                                <img src={application.frontPhoto} alt="Front Photo" className="h-10 w-10"/>
                            </TableCell>
                            <TableCell>
                                {application.backPhoto ?
                                    <img src={application.backPhoto} alt="Back Photo" className="h-10 w-10"/> : 'NA'}
                            </TableCell>
                            <TableCell>
                                <img src={application.photo} alt="Photo" className="h-10 w-10"/>
                            </TableCell>
                            <TableCell>{application.status}</TableCell>
                            <TableCell>{formatDate(application.createdAt)}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button onClick={() => router.replace(`application/${application._id}`)}
                                            variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4"/>
                                        View
                                    </Button>
                                    <Button onClick={() => {
                                        setOpen(true)
                                        setDeletingId(application._id)
                                    }} variant="outline" size="sm">
                                        <Trash2 className="mr-2 h-4 w-4"/>
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>)) : <TableRow>
                        <TableCell colSpan={12}>
                            No Applications found
                        </TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </>)
}
