var body = document.querySelector('body');

function NoteManager(){
    this.notes = [
        {title:'First note',  description: 'You can add new note by clicking the <i class="fas fa-plus"></i> button',color:'light'}
    ];

    this.darkMode = false;

    this.initialize = function(){
        var _this = this;

        body.innerHTML='<div id="container" class="container"><div class="row"></div></div>';

        var codeBtnAddNote = ''+
        '<div id="btnDarkMode" class="btn-dark-mode">'+
        '   <span class="icon"><i class="fas fa-moon"></i></span>'+
        '</div>'+
        '<div id="btnShowAddNoteForm" class="btn-add-note">'+
        '   <span class="icon"><i class="fas fa-plus"></i></span>'+
        '</div>';

        var codeAddNoteForm = ''+
        '<div class="add-note-form d-none">'+
        '   <form id="frmAddNote" class="needs-validation" novalidate>'+
        '   <div class="fieldset">'+
        '        <div class="mb-3">'+
        '            <input type="text" class="form-control" id="title" placeholder="Title" maxlength="20" required>'+
        '            <div class="invalid-feedback">Title is required</div>'+
        '        </div>'+
        '        <div class="mb-3">'+
        '            <input class="form-control" id="note" placeholder="Type your note" maxlength="80" required></input>'+
        '            <div class="invalid-feedback">Note text is required</div>'+
        '        </div>'+
        '        <div class="row mb-3">'+
        '           <div class="col-sm-2 text-center text-sm-start">'+
        '               <label class="text-light">Note color: </label>'+
        '           </div>'+
        '           <div class="col-sm-6 text-center text-sm-start">'+
        '               <input type="radio" class="btn-check" name="colors" id="light" required checked>'+
        '               <label class="btn btn-light" for="light"></label>'+
        '               <input type="radio" class="btn-check" name="colors" id="primary" required>'+
        '               <label class="btn btn-primary" for="primary"></label>'+
        '               <input type="radio" class="btn-check" name="colors" id="secondary" required>'+
        '               <label class="btn btn-secondary" for="secondary"></label>'+
        '               <input type="radio" class="btn-check" name="colors" id="success" required>'+
        '               <label class="btn btn-success" for="success"></label>'+
        '               <input type="radio" class="btn-check" name="colors" id="danger" required>'+
        '               <label class="btn btn-danger" for="danger"></label>'+
        '               <input type="radio" class="btn-check" name="colors" id="warning" required>'+
        '               <label class="btn btn-warning" for="warning"></label>'+
        '               <input type="radio" class="btn-check" name="colors" id="info" required>'+
        '               <label class="btn btn-info" for="info"></label>'+
        '           </div>'+
        '           <div class="col-sm-4 text-center text-sm-end mt-3 mt-sm-0">'+
        '               <button id="btnHideForm" class="btn btn-secondary"><i class="fas fa-times"></i></button>'+
        '               <button id="btnAddNote" class="btn btn-primary"><i class="fas fa-plus"></i></button>'+
        '           </div>'+
        '        </div>'+
        '   </div>'+
        '   </form>'+
        '</div>';
        

        body.insertAdjacentHTML('beforeend', codeBtnAddNote);
        body.insertAdjacentHTML('beforeend', codeAddNoteForm);

        document.getElementById("btnShowAddNoteForm").onclick = this.showAddNoteForm;
        document.getElementById('btnDarkMode').onclick = this.setDarkMode;

        document.getElementById("btnHideForm").onclick = function(e){
            e.preventDefault();
            _this.hideAddNoteForm();
        };

        document.getElementById("btnAddNote").onclick = function(e){
            e.preventDefault();
            _this.addNote();
        };

        this.showNotes();
        
    }

    this.showNotes = function(){
        var _this = this;
        var row = document.querySelector('#container .row');
        row.innerText='';

        this.notes.forEach(function(note, index){
            var codeNote = ''+
            '<div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">'+
            '    <div class="card ' + (note.color=='light' ? '' : 'text-white ') + 'bg-'+ note.color +' mb-3 shadow-lg">'+
            '        <div class="card-header d-flex justify-content-between">'+
            '           <div>'+note.title+'</div>'+
            '           <div class="text-end">'+
            '               <button class="btn btn-danger p-0 px-1 btn-remove-note"><i class="fas fa-times"></i></span></button>'+
            '           </div>'+
            '        </div>'+
            '        <div class="card-body">'+
            '            <p class="card-text">'+note.description+'</p>'+
            '        </div>'+
            '    </div>'+
            '</div>';
            row.insertAdjacentHTML('beforeend',codeNote);
 
        });

        var removeButtons = row.querySelectorAll('.btn-remove-note');
        removeButtons.forEach(function(btn, index){
            btn.addEventListener('click', function(){_this.removeNote(index)});
        });


        
    }

    this.showAddNoteForm = function(){
        document.querySelector('.add-note-form').classList.remove('d-none');
    }

    this.hideAddNoteForm = function(){
        document.querySelector('.add-note-form').classList.add('d-none');
    }

    this.addNote = function(){
        var title = document.querySelector('input[id="title"]');
        var note = document.querySelector('input[id="note"]');
        var color = document.querySelector('input[name="colors"]:checked');
        
        var selectedColor = 'light';

        if(!this.isAddNoteFormValid()) return;  
        if(color && color.id) selectedColor = color.id;     

        this.notes.push({title:title.value,  description: note.value,color:selectedColor});
        this.showNotes();

        this.resetAddNoteForm();
        this.hideAddNoteForm();
    }

    this.removeNote = function(index){
        this.notes.splice(index,1);
        this.showNotes();
    }

    this.isAddNoteFormValid = function(){
        var form = document.querySelector('#frmAddNote');
        form.classList.add('was-validated');
        return form.checkValidity();
    }

    this.resetAddNoteForm = function(){
        var form = document.querySelector('#frmAddNote');
        var inputs = form.querySelectorAll('input');

        inputs.forEach(function(input){
            input.value='';
        });

        form.classList.add('needs-validation');
        form.classList.remove('was-validated');
    }

    this.setDarkMode = function(){
         var btnDarkMode = document.querySelector('#btnDarkMode span i');
         console.log(btnDarkMode);
         body.classList.toggle('dark-mode');
         if(this.darkMode)
               btnDarkMode.classList.replace('fa-sun','fa-moon');
         else
               btnDarkMode.classList.replace('fa-moon','fa-sun');

         this.darkMode = !this.darkMode;

    }


}



var nm = new NoteManager();
nm.initialize();