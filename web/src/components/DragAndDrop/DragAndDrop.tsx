import { useEffect, useRef, useState } from 'react'

import { useFilesContext } from '../../contexts/FileContext/useFiles'

import {
  StyledDragFileContainer,
  StyledForm,
  StyledInputFileUpload,
  StyledLabelFileUpload,
  StyledUploadButton,
} from './DragAndDrop.styles'

const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false)

  const inputRef = useRef(null)

  const { filesSelected, handleFileSelected } = useFilesContext()

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      handleFileSelected(e.dataTransfer.files[0])
    }
  }

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      handleFileSelected(e.target.files[0])
    }
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click()
  }

  useEffect(() => {
    inputRef.current.value = ''
  }, [filesSelected])

  return (
    <StyledForm onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <StyledInputFileUpload
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
      />
      <StyledLabelFileUpload htmlFor="input-file-upload">
        <div>
          <p>Drag and drop your file here or</p>
          <StyledUploadButton onClick={onButtonClick}>
            Upload a file
          </StyledUploadButton>
        </div>
      </StyledLabelFileUpload>
      {dragActive && (
        <StyledDragFileContainer
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></StyledDragFileContainer>
      )}
    </StyledForm>
  )
}

export default DragAndDrop
