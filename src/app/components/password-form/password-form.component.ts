import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  MatFormFieldModule,
  MatError,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatError,
    MatLabel,
  ],
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
})
export class PasswordFormComponent {
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  showPassword = false;

  constructor() {
    this.form = this.fb.group({
      website: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      comments: [''],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.form.valid) {
      this.http.post('/api/passwords', this.form.value).subscribe(() => {
        this.form.reset();
        this.cancel.emit();
      });
    }
  }

  cancelForm() {
    this.cancel.emit(); // Notify parent component to hide the form
  }
}
