default rel
section .text
global main
main:
push qword 1
mov rax, __float64__(2.999)
movq xmm0, rax

sub rsp, 8            ; Float Push
movq [rsp], xmm0


movq xmm0, [rsp]       ; Float Pop
add rsp, 8

roundsd xmm0, xmm0, 11
cvtsd2si rax, xmm0
push rax
pop rbx
pop rax
add rax, rbx
push rax
mov rax, __float64__(3.5)
movq xmm0, rax

sub rsp, 8            ; Float Push
movq [rsp], xmm0


movq xmm0, [rsp]       ; Float Pop
add rsp, 8

roundsd xmm0, xmm0, 11
cvtsd2si rax, xmm0
push rax
pop rbx
pop rax
add rax, rbx
push rax
pop rax
ret
ret
section .data