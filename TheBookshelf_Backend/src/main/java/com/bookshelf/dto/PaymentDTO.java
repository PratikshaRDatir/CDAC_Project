package com.bookshelf.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDTO {

	
	private Long paymentId;
    private Long orderId;
    private Long userId;
    private String paymentStatus;
    private String paymentMode;

}
