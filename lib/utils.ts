import { type ClassValue, clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadPdf = (base64Data: string, fileName: string) => {
  try {
    if (!base64Data) {
      throw new Error('No PDF data available for download.')
    }

    // Remove the data URL prefix if present
    const base64Content = base64Data.includes('base64,')
      ? base64Data.split('base64,')[1]
      : base64Data

    // Decode the base64 string
    const binaryString = window.atob(base64Content)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // Create a Blob from the bytes
    const blob = new Blob([bytes], { type: 'application/pdf' })

    // Create a download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName || 'resume.pdf'

    // Append to the document, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up the URL object
    window.URL.revokeObjectURL(url)

    toast.success('PDF Downloaded successfully')
  } catch (error) {
    console.error('Error downloading PDF:', error)
    toast.error('There was a problem downloading your PDF. Please try again.')
  }
}

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export function capitalizeFirstLetter(string: string) {
  let cleanedString = string.replace(/_/g, ' ')
  return cleanedString
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
